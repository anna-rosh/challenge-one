DROP TABLE IF EXISTS urls;

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    long VARCHAR NOT NULL CHECK (long != ''),
    short VARCHAR NOT NULL CHECK (short != '')
);