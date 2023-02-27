CREATE TABLE IF NOT EXISTS roles(
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(255),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS users(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    password varchar(255),
    role int,
    firstName varchar(255),
    lastName varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES roles(id)
);
CREATE TABLE IF NOT EXISTS towingCompanies(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    contact INT(30),
    phone INT(50),
    zipCode varchar(50),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS jobs (
    id int NOT NULL AUTO_INCREMENT,
    towingCompany INT,
    S varchar(255),
    date Date,
    agent varchar(255),
    insurance varchar(255),
    amount INT,
    gda INT,
    upSell INT,
    charges INT,
    phone INT,
    Charged_Status varchar(255),
    state varchar(255),
    miles varchar(255),
    notes varchar(255),
    status bit,
    PRIMARY KEY (id),
    FOREIGN KEY (towingCompany) REFERENCES towingCompanies(id)
);
CREATE TABLE IF NOT EXISTS towImages(
    id int NOT NULL AUTO_INCREMENT,
    src varchar(255),
    jobId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES jobs(id)
);
CREATE TABLE IF NOT EXISTS towReciepts(
    id int NOT NULL AUTO_INCREMENT,
    src varchar(255),
    jobId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES jobs(id)
);
CREATE TABLE IF NOT EXISTS jobLogs(
    id int NOT NULL AUTO_INCREMENT,
    actions varchar(50),
    jobId INT,
    date TIMESTAMP,
    user INT,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES jobs(id)
);
CREATE TABLE IF NOT EXISTS logChanges(
    id int NOT NULL AUTO_INCREMENT,
    changes VARCHAR(255),
    logId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (logId) REFERENCES jobLogs(id)
);
CREATE TABLE IF NOT EXISTS dipatchTicket(
    id int NOT NULL AUTO_INCREMENT,
    ticketNumber VARCHAR(255),
    jobId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (jobId) REFERENCES jobs(id)
);