CREATE TABLE
    IF NOT EXISTS races (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
        date DATE NOT NULL,
        picture TEXT,
        location TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS pilots (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        firstName TEXT NOT NULL,
        middleName TEXT,
        lastName TEXT NOT NULL,
        nickName TEXT,
        picture TEXT,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS pilotRace (
        raceId INT NOT NULL,
        pilotId INT NOT NULL,
        position INT,
        time NUMERIC(10, 4),
        PRIMARY KEY (pilot_id, race_id),
        FOREIGN KEY (pilot_id) REFERENCES pilots (id) ON DELETE CASCADE,
        FOREIGN KEY (race_id) REFERENCES races (id) ON DELETE CASCADE
    );