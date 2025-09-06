import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  imageUrl: { type: String, required: true } // Setiap warna punya 1 gambar
});


const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { // <-- TAMBAHKAN FIELD BARU INI
      type: String,
      required: true,
      unique: true,
      index: true, // Untuk mempercepat pencarian berdasarkan slug
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    colors: [colorSchema],
    // 👇 FIELD BARU: Untuk link tombol "Pesan Sekarang"
    orderLink: {
        type: String,
        trim: true,
        default: "", // Default kosong
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// FUNGSI UNTUK MEMBUAT SLUG SECARA OTOMATIS
productSchema.pre('save', async function (next) {
  if (this.isModified('name')) {
    // Buat slug dari nama produk
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, '-') // Ganti spasi dengan strip
      .replace(/[^\w-]+/g, ''); // Hapus karakter non-alfanumerik

    // Cek jika slug sudah ada, tambahkan angka unik jika perlu
    let slugExists = true;
    let counter = 1;
    let originalSlug = this.slug;
    while (slugExists) {
      const existingProduct = await mongoose.model('Product').findOne({ slug: this.slug });
      if (existingProduct && existingProduct._id.toString() !== this._id.toString()) {
        this.slug = `${originalSlug}-${counter}`;
        counter++;
      } else {
        slugExists = false;
      }
    }
  }
  next();
});

productSchema.virtual('discountPrice').get(function() {
  if (this.price && this.discountPercentage > 0) {
    return this.price - (this.price * this.discountPercentage / 100);
  }
  return null;
});

export default mongoose.model("Product", productSchema);