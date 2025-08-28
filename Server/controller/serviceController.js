import Service from "../models/Service.js";

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service tidak ditemukan" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const service = new Service({ name, description, icon });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, icon },
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: "Service tidak ditemukan" });
    }
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service tidak ditemukan" });
    }
    res.json({ message: "Service berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};