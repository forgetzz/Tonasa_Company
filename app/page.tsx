"use client";
import React, { useState } from "react";
import { Plus, Trash2, Download, Eye } from "lucide-react";

interface LimbahItem {
  id: string;
  kodeLimbah: string;
  namaLimbah: string;
  jumlahKemasan: string;
  totalBerat: string;
  lokasiTPS: string;
}

interface FormData {
  nomorBA: string;
  hari: string;
  tanggal: string;
  pihak1Nama: string;
  pihak1Unit: string;
  pihak1Jabatan: string;
  pihak2TTD: string;
  pihak2Nama: string;
  pihak2Unit: string;
  pihak2Jabatan: string;
  limbahItems: LimbahItem[];
}

const LimbahB3Generator: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nomorBA: "",
    hari: "",
    tanggal: "",
    pihak1Nama: "Haerul HL.",
    pihak1Unit: "Section of PROPER & CDM",
    pihak1Jabatan: "Jr of Proper & CDM",
    pihak2Nama: "",
    pihak2Unit: "",
    pihak2Jabatan: "",
    pihak2TTD: "",
    limbahItems: [
      {
        id: "1",
        kodeLimbah: "",
        namaLimbah: "",
        jumlahKemasan: "",
        totalBerat: "",
        lokasiTPS: "",
      },
    ],
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLimbahItemChange = (
    id: string,
    field: keyof LimbahItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      limbahItems: prev.limbahItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addLimbahItem = () => {
    const newItem: LimbahItem = {
      id: Date.now().toString(),
      kodeLimbah: "",
      namaLimbah: "",
      jumlahKemasan: "",
      totalBerat: "",
      lokasiTPS: "",
    };
    setFormData((prev) => ({
      ...prev,
      limbahItems: [...prev.limbahItems, newItem],
    }));
  };

  const removeLimbahItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      limbahItems: prev.limbahItems.filter((item) => item.id !== id),
    }));
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(generatePrintHTML());
      printWindow.document.write(generatePrintHTML2());
      printWindow.document.close();
      printWindow.focus();
    }
  };

  const generatePrintHTML = () => {
    return `
    <!DOCTYPE html>
<html>
<head>
  <title>Berita Acara Limbah B3</title>
  <style>
    body { font-family: Arial; font-size: 12px; line-height: 1; margin: 20px ; padding: 30px; }
   .header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.title-wrapper {
  text-align: center;
  flex: 1;
}

.title {
  font-size: 78px;
  font-weight: bold;
  text-transform: uppercase;
}

.subtitle {
  font-size: 20px;
  font-weight: bold;
}

.nomor {
  margin-top: 10px;
  font-size: 16px;
}

.logo {
  position: absolute;
  right: 0;
  top: 0;
}

.logo img {
  height: 60px; /* atur sesuai kebutuhan */
}

    .logo img { width: 60px; height: 60px; object-fit: contain; margin-bottom: 10px; }
    .logo2 img { width: 100px; height:100px; object-fit: contain; margin-bottom: -50px; }
    .title { font-weight: bold; font-size: 22px; margin-bottom: 5px; }
    .subtitle { text-decoration: underline; font-size: 22px; }
    .content { margin: 20px 0; }
    .party { margin: 15px 0; }
    .party-title { text-decoration: underline; font-weight: bold; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid black; padding: 6px; text-align: left; }
    th { font-weight: bold; }
    .signatures { display: flex; justify-content: space-between; margin-top: 40px; }
    .signature { text-align: center; width: 200px; }
    .signature-line { border-bottom: 1px solid black; margin: 40px 0 5px; height: 0; }
    .approval { text-align: center; margin-top: 60px; }
    .parties {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  justify-content: center; /* biar ketemu di tengah */
  gap: 5px; /* jarak antar pihak biar gak dempetan */
}

.party {
  width: 250px;
}

  </style>
</head>
<body>
 <div class="header">
  <div class="title-wrapper">
    <div class="title">BERITA ACARA</div>
    <div class="subtitle">SERAH TERIMA LIMBAH B3 (MASUK TPS)</div>
    <div class="nomor">
      No. ${formData.nomorBA || "....."}/BA/32.44/${formData.tanggal}
    </div>
  </div>
  <div class="logo">
    <img src="/logo.png" alt="Logo" />
  </div>
</div>

  
  <div class="content">
    <p>Pada hari ${formData.hari || "........"}, Tanggal ${
      formData.tanggal || "................."
    } berlokasi di PT Semen Tonasa yang bertanda </br> tangan dibawah ini adalah :</p>
    
  <div class="parties">
  <div class="party">
    <div class="party-title">PIHAK 1 : PENGELOLA TPS LB3</div>
    <p>Nama : ${formData.pihak1Nama || "Haerul HL."}</p>
    <p>Unit Kerja : ${formData.pihak1Unit || "Section of PROPER & CDM"}</p>
    <p>Jabatan : ${formData.pihak1Jabatan || "Jr of Proper & CDM"}</p>
  </div>
  
  <div class="party">
    <div class="party-title">PIHAK 2 : PENGHASIL LIMBAH B3</div>
    <p>Nama : ${formData.pihak2Nama || "..............."}</p>
    <p>Unit Kerja : ${formData.pihak2Unit || "..............."}</p>
    <p>Jabatan : ${formData.pihak2Jabatan || ".............."}</p>
  </div>
</div>

    <p>Dengan ini <strong>PIHAK 2</strong> telah menyerahkan Limbah B3 Kepada <strong>PIHAK 1</strong> sebagai Pengelola TPS Limbah B3 (Seksi Proper & CDM) dengan Jenis Limbah antara lain :</p>
    
    <table>
     <thead>
  <tr>
    <th style="background-color:#98A869;">No</th>
    <th style="background-color:#98A869;">Kode Limbah</th>
    <th style="background-color:#98A869;">Nama Limbah</th>
    <th style="background-color:#98A869;">Jumlah Kemasan</th>
    <th style="background-color:#98A869;">Total Berat (Kg)</th>
    <th style="background-color:#98A869;">Lokasi TPS LB3</th>
  </tr>
</thead>

      <tbody>
        ${formData.limbahItems
          .map(
            (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.kodeLimbah}</td>
            <td>${item.namaLimbah}</td>
            <td>${item.jumlahKemasan}</td>
            <td>${item.totalBerat}</td>
            <td>${item.lokasiTPS}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    
    <div class="signatures">
      <div class="signature">
        <div>Pengelola TPS LB3</div>
          <div class="logo2">
    <img src="/ttd.png" alt="Logo" />
           </div>
        <div class="signature-line"> </div>
        <div><strong><u>${
          (formData.pihak1Nama || "Haerul HL.").split(" ")[0]
        }</u></strong></div>
        <div>${formData.pihak1Jabatan || "Jr. of Proper & CDM"}</div>
      </div>
      <div class="signature">
    
        <div>Penghasil LB3</div>
          ${
            formData.pihak2TTD
              ? `<img src="${formData.pihak2TTD}" alt="Tanda Tangan Pihak 2" style="height:60px; margin-top: 30px; margin-bottom: -30px; " />`
              : ""
          }

        <div class="signature-line"></div>
      <div><strong><u>${formData.pihak2Nama}</u></strong></div>
        <div>${formData.pihak2Jabatan}</div>
      </div>
    </div>
    
    <div class="approval">
      <div>Menyetujui</div>
      <div style="margin-top: 60px; margin-bottom: 200px;">
        <strong><u>Andi Mayundari</u></strong><br>
        Mgr of Proper & CDM
      </div>
    </div>
  </div>
</body>
</html>

    `;
  };
  const generatePrintHTML2 = () => {
    return `
    <!DOCTYPE html>
<html>
<head>
  <title>Berita Acara Limbah B3</title>
  <style>
    body { font-family: Arial; font-size: 12px; line-height: 1; margin: 20px ; padding: 30px; }
   .header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.title-wrapper {
  text-align: center;
  flex: 1;
}

.title {
  font-size: 78px;
  font-weight: bold;
  text-transform: uppercase;
}

.subtitle {
  font-size: 20px;
  font-weight: bold;
}

.nomor {
  margin-top: 10px;
  font-size: 16px;
}

.logo {
  position: absolute;
  right: 0;
  top: 0;
}

.logo img {
  height: 60px; /* atur sesuai kebutuhan */
}

    .logo img { width: 60px; height: 60px; object-fit: contain; margin-bottom: 10px; }
    .logo2 img { width: 100px; height:100px; object-fit: contain; margin-bottom: -50px; }
    .title { font-weight: bold; font-size: 22px; margin-bottom: 5px; }
    .subtitle { text-decoration: underline; font-size: 22px; }
    .content { margin: 20px 0; }
    .party { margin: 15px 0; }
    .party-title { text-decoration: underline; font-weight: bold; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid black; padding: 6px; text-align: left; }
    th { font-weight: bold; }
    .signatures { display: flex; justify-content: space-between; margin-top: 40px; }
    .signature { text-align: center; width: 200px; }
    .signature-line { border-bottom: 1px solid black; margin: 40px 0 5px; height: 0; }
    .approval { text-align: center; margin-top: 60px; }
    .parties {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  justify-content: center; /* biar ketemu di tengah */
  gap: 5px; /* jarak antar pihak biar gak dempetan */
}

.party {
  width: 250px;
}

  </style>
</head>
<body>
 <div class="header">
  <div class="title-wrapper">
    <div class="title">BERITA ACARA</div>
    <div class="subtitle">SERAH TERIMA LIMBAH B3 (KELUAR TPS)</div>
    <div class="nomor">
      No. ${formData.nomorBA || "....."}/BA/32.44/${formData.tanggal}
    </div>
  </div>
  <div class="logo">
    <img src="/logo.png" alt="Logo" />
  </div>
</div>

  
  <div class="content">
    <p>Pada hari ${formData.hari || "........"}, Tanggal ${
      formData.tanggal || "................."
    } berlokasi di PT Semen Tonasa yang bertanda </br> tangan dibawah ini adalah :</p>
    
  <div class="parties">
  <div class="party">
    <div class="party-title">PIHAK 1 : PENGELOLA TPS LB3</div>
    <p>Nama : ${formData.pihak1Nama || "Haerul HL."}</p>
    <p>Unit Kerja : ${formData.pihak1Unit || "Section of PROPER & CDM"}</p>
    <p>Jabatan : ${formData.pihak1Jabatan || "Jr of Proper & CDM"}</p>
  </div>
  
  <div class="party">
    <div class="party-title">PIHAK 2 : PENGHASIL LIMBAH B3</div>
    <p>Nama : ${formData.pihak2Nama || "..............."}</p>
    <p>Unit Kerja : ${formData.pihak2Unit || "..............."}</p>
    <p>Jabatan : ${formData.pihak2Jabatan || ".............."}</p>
  </div>
</div>

    <p>Dengan ini <strong>PIHAK 2</strong> telah menyerahkan Limbah B3 Kepada <strong>PIHAK 1</strong> sebagai Pengelola TPS Limbah B3 (Seksi Proper & CDM) dengan Jenis Limbah antara lain :</p>
    
    <table>
     <thead>
  <tr>
    <th style="background-color:#98A869;">No</th>
    <th style="background-color:#98A869;">Kode Limbah</th>
    <th style="background-color:#98A869;">Nama Limbah</th>
    <th style="background-color:#98A869;">Jumlah Kemasan</th>
    <th style="background-color:#98A869;">Total Berat (Kg)</th>
    <th style="background-color:#98A869;">Lokasi TPS LB3</th>
  </tr>
</thead>

      <tbody>
        ${formData.limbahItems
          .map(
            (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.kodeLimbah}</td>
            <td>${item.namaLimbah}</td>
            <td>${item.jumlahKemasan}</td>
            <td>${item.totalBerat}</td>
            <td>${item.lokasiTPS}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    
    <div class="signatures">
      <div class="signature">
        <div>Pengelola TPS LB3</div>
          <div class="logo2">
    <img src="/ttd.png" alt="Logo" />
           </div>
        <div class="signature-line"> </div>
        <div><strong><u>${
          (formData.pihak1Nama || "Haerul HL.").split(" ")[0]
        }</u></strong></div>
        <div>${formData.pihak1Jabatan || "Jr. of Proper & CDM"}</div>
      </div>
      <div class="signature">
    
        <div>Penghasil LB3</div>
          ${
            formData.pihak2TTD
              ? `<img src="${formData.pihak2TTD}" alt="Tanda Tangan Pihak 2" style="height:60px; margin-top: 30px; margin-bottom: -30px; " />`
              : ""
          }

        <div class="signature-line"></div>
<div><strong><u>${formData.pihak2Nama}</u></strong></div>
        <div>${formData.pihak2Jabatan}</div>
      </div>
    </div>
    
    <div class="approval">
      <div>Menyetujui</div>
      <div style="margin-top: 60px; ">
        <strong><u>Andi Mayundari</u></strong><br>
        Mgr of Proper & CDM
      </div>
    </div>
  </div>
</body>
</html>

    `;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 -white">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Generator Berita Acara Limbah B3</h1>
        <div className="flex gap-2">
          {/* <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 -blue-500 text-white rounded hover:-blue-600"
          >
            <Eye size={16} />
            {isPreview ? "Edit" : "Preview"}
          </button> */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 -green-500 text-white rounded hover:-green-600"
          >
            <Download size={16} />
            Print/Download
          </button>
        </div>
      </div>

      {!isPreview ? (
        // Form Input
        <div className="space-y-6">
          {/* Header Information */}
          <div className="-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Informasi Dokumen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Nomor BA
                </label>
                <input
                  type="text"
                  value={formData.nomorBA}
                  onChange={(e) => handleInputChange("nomorBA", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: 001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium  mb-1">Hari</label>
                <input
                  type="text"
                  value={formData.hari}
                  onChange={(e) => handleInputChange("hari", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Senin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Tanggal
                </label>
                <input
                  type="text"
                  value={formData.tanggal}
                  onChange={(e) => handleInputChange("tanggal", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: 15-09-2025"
                />
              </div>
            </div>
          </div>

          {/* Pihak 2 Information */}
          <div className="-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Pihak 2 - Penghasil Limbah B3
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium  mb-1">Nama</label>
                <input
                  type="text"
                  value={formData.pihak2Nama}
                  onChange={(e) =>
                    handleInputChange("pihak2Nama", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Unit Kerja
                </label>
                <input
                  type="text"
                  value={formData.pihak2Unit}
                  onChange={(e) =>
                    handleInputChange("pihak2Unit", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Jabatan
                </label>
                <input
                  type="text"
                  value={formData.pihak2Jabatan}
                  onChange={(e) =>
                    handleInputChange("pihak2Jabatan", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-500 transition">
                <label
                  htmlFor="ttd-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3"
                    />
                  </svg>
                  <span className="text-gray-600 font-medium">
                    Klik untuk upload tanda tangan
                  </span>
                  <span className="text-xs text-gray-400">
                    Format: JPG / PNG
                  </span>
                </label>

                <input
                  id="ttd-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const url = URL.createObjectURL(file);

                    setFormData((prev) => ({
                      ...prev,
                      pihak2TTD: url,
                    }));

                    localStorage.setItem("ttd", url);
                  }}
                />

                {formData.pihak2TTD && (
                  <div className="mt-4">
                    <img
                      src={formData.pihak2TTD}
                      alt="Tanda Tangan Preview"
                      className="mx-auto h-20 rounded border border-gray-300 shadow-sm bg-white p-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Limbah Items */}
          <div className="-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Data Limbah B3</h2>
              <button
                onClick={addLimbahItem}
                className="flex items-center gap-2 px-3 py-2 -blue-500 text-white rounded hover:-blue-600"
              >
                <Plus size={16} />
                Tambah Item
              </button>
            </div>

            <div className="space-y-4">
              {formData.limbahItems.map((item, index) => (
                <div key={item.id} className="-white p-4 rounded border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Item Limbah {index + 1}</h3>
                    {formData.limbahItems.length > 1 && (
                      <button
                        onClick={() => removeLimbahItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-sm font-medium  mb-1">
                        Kode Limbah
                      </label>
                      <input
                        type="text"
                        value={item.kodeLimbah}
                        onChange={(e) =>
                          handleLimbahItemChange(
                            item.id,
                            "kodeLimbah",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium  mb-1">
                        Nama Limbah
                      </label>
                      <input
                        type="text"
                        value={item.namaLimbah}
                        onChange={(e) =>
                          handleLimbahItemChange(
                            item.id,
                            "namaLimbah",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium  mb-1">
                        Jumlah Kemasan
                      </label>
                      <input
                        type="text"
                        value={item.jumlahKemasan}
                        onChange={(e) =>
                          handleLimbahItemChange(
                            item.id,
                            "jumlahKemasan",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium  mb-1">
                        Total Berat (Kg)
                      </label>
                      <input
                        type="text"
                        value={item.totalBerat}
                        onChange={(e) =>
                          handleLimbahItemChange(
                            item.id,
                            "totalBerat",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium  mb-1">
                        Lokasi TPS LB3
                      </label>
                      <input
                        type="text"
                        value={item.lokasiTPS}
                        onChange={(e) =>
                          handleLimbahItemChange(
                            item.id,
                            "lokasiTPS",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Preview Document
        <div
          className="-white border border-gray-300 p-8 shadow-lg"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
            lineHeight: "1.4",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 -gray-200 mx-auto mb-2 flex items-center justify-center text-xs">
              <img src="/logo.png" alt="" />
            </div>
            <div className="font-bold text-lg mb-1">BERITA ACARA</div>
            <div className="underline text-sm mb-2">
              SERAH TERIMA LIMBAH B3 (MASUK TPS)
            </div>
            <div className="text-sm">
              No. {formData.nomorBA || "....."}/BA/32.44/..... - 2024
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="mb-4">
              Pada hari {formData.hari || "........"}, Tanggal{" "}
              {formData.tanggal || "................."} 2024 berlokasi di PT
              Semen Tonasa yang bertanda tangan dibawah ini adalah :
            </p>

            {/* Pihak 1 */}
            <div className="mb-4">
              <div className="font-bold underline mb-2">
                PIHAK 1 : PENGELOLA TPS LB3
              </div>
              <p className="mb-1">
                Nama : {formData.pihak1Nama || "Haerul HL."}
              </p>
              <p className="mb-1">
                Unit Kerja : {formData.pihak1Unit || "Section of PROPER & CDM"}
              </p>
              <p className="mb-1">
                Jabatan : {formData.pihak1Jabatan || "Jr of Proper & CDM"}
              </p>
            </div>

            {/* Pihak 2 */}
            <div className="mb-4">
              <div className="font-bold underline mb-2">
                PIHAK 2 : PENGHASIL LIMBAH B3
              </div>
              <p className="mb-1">
                Nama : {formData.pihak2Nama || "..............."}
              </p>
              <p className="mb-1">
                Unit Kerja : {formData.pihak2Unit || "..............."}
              </p>
              <p className="mb-1">
                Jabatan : {formData.pihak2Jabatan || ".............."}
              </p>
            </div>

            <p className="mb-4">
              Dengan ini <strong>PIHAK 2</strong> telah menyerahkan Limbah B3
              Kepada <strong>PIHAK 1</strong> sebagai Pengelola TPS Limbah B3
              (Seksi Proper & CDM) dengan Jenis Limbah antara lain :
            </p>

            {/* Table */}
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr>
                  <th className="border border-black p-2 -gray-100">No</th>
                  <th className="border border-black p-2 -gray-100">
                    Kode Limbah
                  </th>
                  <th className="border border-black p-2 -gray-100">
                    Nama Limbah
                  </th>
                  <th className="border border-black p-2 -gray-100">
                    Jumlah Kemasan
                  </th>
                  <th className="border border-black p-2 -gray-100">
                    Total Berat (Kg)
                  </th>
                  <th className="border border-black p-2 -gray-100">
                    Lokasi TPS LB3
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.limbahItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-black p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2">
                      {item.kodeLimbah}
                    </td>
                    <td className="border border-black p-2">
                      {item.namaLimbah}
                    </td>
                    <td className="border border-black p-2">
                      {item.jumlahKemasan}
                    </td>
                    <td className="border border-black p-2">
                      {item.totalBerat}
                    </td>
                    <td className="border border-black p-2">
                      {item.lokasiTPS}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Signatures */}
            <div className="flex justify-between mt-12">
              <div className="text-center w-48">
                <div className="mb-1">Pengelola TPS LB3</div>
                <div className="h-16 mb-2"></div>
                <div className="font-bold underline">
                  {formData.pihak1Nama.split(" ")[0] || "Haerul"}
                </div>
                <div>{formData.pihak1Jabatan || "Jr. of Proper & CDM"}</div>
              </div>
              <div className="text-center w-48">
                <div className="mb-1">Penghasil LB3</div>
                <div className="h-16 mb-2"></div>
                <div className="underline">.........................</div>
                <div>...........................</div>
              </div>
            </div>

            {/* Approval */}
            <div className="text-center mt-12">
              <div className="mb-16">Menyetujui</div>
              <div className="font-bold underline">Andi Mayundari</div>
              <div>Mgr of Proper & CDM</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LimbahB3Generator;
