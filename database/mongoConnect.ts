import mongoose from "mongoose";

const mongoURI: string = 'mongodb+srv://avvan:VannDev7@cluster1.j9komvz.mongodb.net/EventTickets'
// Menghubungkan ke MongoDB
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Koneksi ke MongoDB berhasil!');
    } catch (error) {
        // Cek apakah error memiliki message
        const errorMessage = error instanceof Error ? error.message : 'Kesalahan tidak terduga';
        console.error('Koneksi ke MongoDB gagal:', errorMessage);
        process.exit(1); // Keluar dari proses jika gagal terhubung
    }
};

// Menutup koneksi saat aplikasi berhenti
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Koneksi ke MongoDB ditutup');
    process.exit(0);
});

export default connectDB;
