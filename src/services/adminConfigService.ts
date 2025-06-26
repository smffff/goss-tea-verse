
interface AdminConfig {
  isAdminMode: boolean;
  forceOGAccess: boolean;
  mockTokenBalance: number | null;
  debugMode: boolean;
}

class AdminConfigService {
  private config: AdminConfig = {
    isAdminMode: false,
    forceOGAccess: false,
    mockTokenBalance: null,
    debugMode: false
  };

  // Check for admin access via URL params or localStorage
  initializeAdmin(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const adminKey = urlParams.get('admin');
    const storedAdminMode = localStorage.getItem('ctea_admin_mode');
    
    // Simple admin key check (in production, use proper authentication)
    if (adminKey === 'ctea2024' || storedAdminMode === 'true') {
      this.enableAdminMode();
    }

    // Check for debug params
    if (urlParams.get('debug') === 'true') {
      this.config.debugMode = true;
    }

    // Check for force OG access
    if (urlParams.get('force_og') === 'true') {
      this.config.forceOGAccess = true;
    }

    // Check for mock balance
    const mockBalance = urlParams.get('mock_balance');
    if (mockBalance) {
      this.config.mockTokenBalance = parseInt(mockBalance, 10);
    }
  }

  enableAdminMode(): void {
    this.config.isAdminMode = true;
    localStorage.setItem('ctea_admin_mode', 'true');
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔧 Admin mode enabled');
  }

  disableAdminMode(): void {
    this.config.isAdminMode = false;
    this.config.forceOGAccess = false;
    this.config.mockTokenBalance = null;
    localStorage.removeItem('ctea_admin_mode');
    if (process.env.NODE_ENV === "development") { if (process.env.NODE_ENV === "development") { secureLog.info('🔧 Admin mode disabled');
  }

  toggleAdminMode(): void {
    if (this.config.isAdminMode) {
      this.disableAdminMode();
    } else {
      this.enableAdminMode();
    }
  }

  getConfig(): AdminConfig {
    return { ...this.config };
  }

  isAdminMode(): boolean {
    return this.config.isAdminMode;
  }

  shouldForceOGAccess(): boolean {
    return this.config.forceOGAccess || this.config.isAdminMode;
  }

  getMockTokenBalance(): number | null {
    return this.config.mockTokenBalance;
  }

  isDebugMode(): boolean {
    return this.config.debugMode;
  }

  setForceOGAccess(force: boolean): void {
    this.config.forceOGAccess = force;
  }

  setMockTokenBalance(balance: number | null): void {
    this.config.mockTokenBalance = balance;
  }
}

export const adminConfigService = new AdminConfigService();
