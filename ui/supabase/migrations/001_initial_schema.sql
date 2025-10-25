-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price DECIMAL(10, 4) NOT NULL CHECK (price >= 0),
  total_tickets INTEGER NOT NULL CHECK (total_tickets > 0),
  tickets_sold INTEGER DEFAULT 0 CHECK (tickets_sold >= 0),
  creator_address TEXT NOT NULL,
  nft_contract_address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  token_id INTEGER NOT NULL,
  owner_address TEXT NOT NULL,
  price_paid DECIMAL(10, 4) NOT NULL CHECK (price_paid >= 0),
  qr_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'used', 'cancelled')),
  purchase_tx_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, token_id)
);

-- Create purchases table for transaction history
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  buyer_address TEXT NOT NULL,
  seller_address TEXT,
  price DECIMAL(10, 4) NOT NULL CHECK (price >= 0),
  transaction_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_creator ON events(creator_address);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_owner ON tickets(owner_address);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_purchases_ticket ON purchases(ticket_id);
CREATE INDEX idx_purchases_buyer ON purchases(buyer_address);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to events
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

-- Create policies for ticket access
CREATE POLICY "Tickets are viewable by everyone" ON tickets
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own tickets" ON tickets
  FOR INSERT WITH CHECK (auth.uid()::text = owner_address);

CREATE POLICY "Users can update their own tickets" ON tickets
  FOR UPDATE USING (auth.uid()::text = owner_address);

-- Create policies for purchases
CREATE POLICY "Purchases are viewable by everyone" ON purchases
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own purchases" ON purchases
  FOR INSERT WITH CHECK (auth.uid()::text = buyer_address);

-- Create function to generate QR codes
CREATE OR REPLACE FUNCTION generate_qr_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER := 0;
BEGIN
  FOR i IN 1..16 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create function to get available tickets count
CREATE OR REPLACE FUNCTION get_available_tickets(event_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT total_tickets - COALESCE(tickets_sold, 0)
    FROM events
    WHERE id = event_uuid
  );
END;
$$ LANGUAGE plpgsql;

-- Insert some sample events
INSERT INTO events (title, description, date, location, image_url, price, total_tickets, creator_address) VALUES
('Crypto Music Festival 2025', 'The biggest crypto music festival featuring top blockchain artists and NFT showcases.', '2025-11-15 18:00:00+00', 'Los Angeles, CA', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', 0.5, 500, '0x1234567890123456789012345678901234567890'),
('NFT Art Exhibition', 'Exclusive NFT art exhibition featuring works from renowned digital artists.', '2025-12-01 10:00:00+00', 'New York, NY', 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&q=80', 0.25, 200, '0x0987654321098765432109876543210987654321'),
('Web3 Developer Conference', 'Annual conference for Web3 developers, featuring talks on blockchain, DeFi, and NFTs.', '2026-01-10 09:00:00+00', 'San Francisco, CA', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', 0.3, 1000, '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd');
