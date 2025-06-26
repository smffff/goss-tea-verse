-- CTEA NEWSROOM: Supabase Schema for Early User Rewards

-- USERS TABLE
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  wallet_address text unique not null,
  email text,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  token_balance integer default 0,
  identity_visibility text default 'anon' -- 'anon' or 'public', controls user visibility
);

-- TOKEN REWARDS TABLE
create table if not exists token_rewards (
  id uuid default gen_random_uuid() primary key,
  wallet_address text not null references users(wallet_address) on delete cascade,
  reward_type text not null,
  amount integer not null,
  created_at timestamp default now()
);

-- INCREMENT USER BALANCE FUNCTION
create or replace function increment_user_balance(wallet text, amount integer)
returns void as $$
begin
  update users
  set token_balance = token_balance + amount,
      updated_at = now()
  where wallet_address = wallet;
end;
$$ language plpgsql;

-- RLS POLICIES (Optional)

-- USERS RLS
alter table users enable row level security;

create policy "User can read and update own profile"
on users
for all
using (wallet_address = auth.jwt() ->> 'wallet_address');

-- TOKEN_REWARDS RLS
alter table token_rewards enable row level security;

create policy "User can view their own rewards"
on token_rewards
for select
using (wallet_address = auth.jwt() ->> 'wallet_address'); 