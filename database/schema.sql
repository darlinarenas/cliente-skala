CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'inmobiliaria', 'tecnico')),
    status TEXT NOT NULL DEFAULT 'pending',
    phone TEXT,
    company TEXT,
    specialty TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id),
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    manager TEXT,
    phone TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    owner_id UUID REFERENCES users(id),
    property_id UUID REFERENCES properties(id),
    technician_id UUID REFERENCES users(id),
    category TEXT,
    priority TEXT,
    description TEXT,
    status TEXT DEFAULT 'Pendiente',
    technician_note TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE requirement_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requirement_id UUID REFERENCES requirements(id),
    file_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evidences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requirement_id UUID REFERENCES requirements(id),
    technician_id UUID REFERENCES users(id),
    comment TEXT,
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL,
    subject TEXT,
    from_id UUID REFERENCES users(id),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
