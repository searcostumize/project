CREATE TABLE races (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE corporations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE workers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    race_id INT REFERENCES races(id),
    corporation_id INT REFERENCES corporations(id)
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL -- Type can be 'race' or 'corporation'
);

CREATE TABLE worker_tags (
    worker_id INT REFERENCES workers(id),
    tag_id INT REFERENCES tags(id),
    PRIMARY KEY (worker_id, tag_id)
);
