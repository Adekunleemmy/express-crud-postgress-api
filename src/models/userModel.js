import pool from "../config/db.js";

export const getAllUsersRes = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdRes = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const createUserRes = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );
  return result.rows[0];
};

export const updateUserRes = async (id, name, email) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const deleteUserRes = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};
