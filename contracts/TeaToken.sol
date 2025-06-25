// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TeaToken
 * @dev CTea Newsroom's native token for governance and rewards
 */
contract TeaToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard {
    
    // Tokenomics
    uint256 public constant INITIAL_SUPPLY = 100_000_000 * 10**18; // 100M tokens
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1B tokens max
    
    // Reward pools
    uint256 public communityRewardPool;
    uint256 public governanceRewardPool;
    uint256 public liquidityPool;
    
    // Staking and rewards
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public lastRewardTime;
    uint256 public totalStaked;
    uint256 public rewardRate = 100; // 1% annual rate (100 basis points)
    
    // Governance
    mapping(address => uint256) public lastVoteTime;
    uint256 public constant VOTE_COOLDOWN = 1 days;
    
    // Events
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event GovernanceVote(address indexed user, uint256 proposalId, bool support);
    
    constructor() ERC20("CTea Token", "TEA") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
        
        // Allocate initial supply
        communityRewardPool = INITIAL_SUPPLY * 40 / 100; // 40% for community rewards
        governanceRewardPool = INITIAL_SUPPLY * 20 / 100; // 20% for governance rewards
        liquidityPool = INITIAL_SUPPLY * 20 / 100; // 20% for liquidity
        // Remaining 20% stays with owner for initial distribution
    }
    
    /**
     * @dev Stake tokens to earn rewards
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Calculate pending rewards
        uint256 pendingRewards = calculatePendingRewards(msg.sender);
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        // Update staking data
        stakedAmount[msg.sender] += amount;
        totalStaked += amount;
        lastRewardTime[msg.sender] = block.timestamp;
        
        // Claim pending rewards if any
        if (pendingRewards > 0) {
            _mint(msg.sender, pendingRewards);
        }
        
        emit TokensStaked(msg.sender, amount);
    }
    
    /**
     * @dev Unstake tokens
     */
    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot unstake 0 tokens");
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");
        
        // Calculate and claim rewards
        uint256 pendingRewards = calculatePendingRewards(msg.sender);
        if (pendingRewards > 0) {
            _mint(msg.sender, pendingRewards);
        }
        
        // Update staking data
        stakedAmount[msg.sender] -= amount;
        totalStaked -= amount;
        lastRewardTime[msg.sender] = block.timestamp;
        
        // Transfer tokens back to user
        _transfer(address(this), msg.sender, amount);
        
        emit TokensUnstaked(msg.sender, amount);
    }
    
    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        uint256 pendingRewards = calculatePendingRewards(msg.sender);
        require(pendingRewards > 0, "No rewards to claim");
        
        lastRewardTime[msg.sender] = block.timestamp;
        _mint(msg.sender, pendingRewards);
        
        emit RewardsClaimed(msg.sender, pendingRewards);
    }
    
    /**
     * @dev Calculate pending rewards for a user
     */
    function calculatePendingRewards(address user) public view returns (uint256) {
        if (stakedAmount[user] == 0 || totalStaked == 0) {
            return 0;
        }
        
        uint256 timeStaked = block.timestamp - lastRewardTime[user];
        uint256 rewardPerSecond = (totalStaked * rewardRate) / (365 days * 10000); // 10000 basis points
        uint256 userReward = (stakedAmount[user] * rewardPerSecond * timeStaked) / totalStaked;
        
        return userReward;
    }
    
    /**
     * @dev Vote on governance proposals
     */
    function vote(uint256 proposalId, bool support) external {
        require(balanceOf(msg.sender) > 0, "Must hold tokens to vote");
        require(block.timestamp >= lastVoteTime[msg.sender] + VOTE_COOLDOWN, "Vote cooldown active");
        
        lastVoteTime[msg.sender] = block.timestamp;
        
        emit GovernanceVote(msg.sender, proposalId, support);
    }
    
    /**
     * @dev Distribute community rewards
     */
    function distributeCommunityRewards(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(communityRewardPool >= amounts[i], "Insufficient reward pool");
            communityRewardPool -= amounts[i];
            _mint(recipients[i], amounts[i]);
        }
    }
    
    /**
     * @dev Update reward rate (only owner)
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 1000, "Rate too high"); // Max 10%
        rewardRate = newRate;
    }
    
    /**
     * @dev Pause token transfers (emergency only)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Mint new tokens (only owner, up to max supply)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    // Override required functions
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
    
    /**
     * @dev Get user's staking info
     */
    function getStakingInfo(address user) external view returns (
        uint256 staked,
        uint256 pendingRewards,
        uint256 lastReward
    ) {
        return (
            stakedAmount[user],
            calculatePendingRewards(user),
            lastRewardTime[user]
        );
    }
    
    /**
     * @dev Get contract stats
     */
    function getContractStats() external view returns (
        uint256 totalStakedTokens,
        uint256 totalRewardPool,
        uint256 currentRewardRate
    ) {
        return (
            totalStaked,
            communityRewardPool + governanceRewardPool,
            rewardRate
        );
    }
} 