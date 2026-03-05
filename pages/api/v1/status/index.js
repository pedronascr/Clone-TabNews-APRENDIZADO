import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const maxConnections = await database.query("SHOW max_connections;");
  const activeConnections = await database.query(
    "SELECT count(*) FROM pg_stat_activity;",
  );
  const actualVersion = await database.query("SELECT version();");

  res.status(200).json({
    updated_at: updatedAt,
    max_connections: maxConnections.rows[0].max_connections,
    active_connections: activeConnections.rows[0].count,
    actual_version: actualVersion.rows[0].version,
  });
}

export default status;
