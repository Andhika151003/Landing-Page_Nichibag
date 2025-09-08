import LogActivity from "../models/LogActivity.js";

export const saveLog = async (user, action, type, status = "success") => {
  try {
    const log = new LogActivity({ user, action, type, status });
    await log.save();
  } catch (err) {
    console.error("Failed to save log:", err);
  }
};
