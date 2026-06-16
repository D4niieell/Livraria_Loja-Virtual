USE bd_livrariaonline;

CREATE TABLE tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_phone VARCHAR(20),
    role_id INT NOT NULL,
    user_status BOOLEAN DEFAULT TRUE,
    user_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

INSERT INTO
    roles (role_name)
VALUES ("clientes"),
    ("vendedor"),
    ("generate"),
    ("admin");

INSERT INTO
    users (
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id
    )
VALUES (
        "Daniel",
        "daniel.augusto@email.com",
        "#senha321",
        "(11)01134-5677",
        1
    ),
    (
        "Adenilson",
        "adenilson.@email.com",
        "@senha4321",
        "(11)02234-5688",
        2
    ),
    (
        "João Pedro",
        "jpedro.@email.com",
        "senha_54321",
        "(11)03334-6799",
        3
    ),
    (
        "João Paulo",
        "jpaulo.@email.com",
        "#senha-654321",
        "(11)04434-6689",
        4
    );