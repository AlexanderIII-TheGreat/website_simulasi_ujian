'use client';

import React, { useState } from 'react';

// --- TYPE DEFINITIONS ---
interface MCQ {
  q: string;
  options: string[];
  ans: number;
  exp: string;
}

interface Essay {
  q: string;
  exp: string;
}

// --- DATA SOAL MATEMATIKA ---
// Catatan: Menggunakan tag HTML (<sup>, <sub>, &radic;, &deg;, dll) agar format matematika terbaca dengan baik.
const mcqData: MCQ[] = [
  { q: "1. Nilai x yang memenuhi persamaan: 4<sup>2x+3</sup> = 32<sup>x+2</sup> adalah ....", options: ["A. -17", "B. -4", "C. -1", "D. 1", "E. 4"], ans: 1, exp: "<b>Langkah 1:</b> Samakan basis di kedua ruas menjadi basis 2.<br/>(2<sup>2</sup>)<sup>2x+3</sup> = (2<sup>5</sup>)<sup>x+2</sup><br/><b>Langkah 2:</b> Kalikan pangkatnya.<br/>2<sup>4x+6</sup> = 2<sup>5x+10</sup><br/><b>Langkah 3:</b> Karena basis sudah sama, samakan nilai pangkatnya.<br/>4x + 6 = 5x + 10<br/>6 - 10 = 5x - 4x<br/>-4 = x." },
  { q: "2. Bentuk sederhana dari (a<sup>3</sup>b<sup>2</sup>)<sup>2</sup> c<sup>-2</sup> / (a<sup>2</sup>bc) adalah....", options: ["A. (a<sup>4</sup>b<sup>3</sup>) / c<sup>3</sup>", "B. a<sup>4</sup>b<sup>3</sup>c", "C. (a<sup>6</sup>b<sup>3</sup>) / c<sup>3</sup>", "D. (a<sup>2</sup>b<sup>3</sup>) / c<sup>3</sup>", "E. a<sup>4</sup>b<sup>3</sup>c<sup>3</sup>"], ans: 0, exp: "<b>Langkah 1:</b> Jabarkan pangkat pada pembilang.<br/>a<sup>3&times;2</sup> b<sup>2&times;2</sup> c<sup>-2</sup> = a<sup>6</sup>b<sup>4</sup>c<sup>-2</sup><br/><b>Langkah 2:</b> Bagi dengan penyebut dengan cara mengurangkan pangkat yang basisnya sama.<br/>a<sup>6-2</sup> &middot; b<sup>4-1</sup> &middot; c<sup>-2-1</sup> = a<sup>4</sup>b<sup>3</sup>c<sup>-3</sup><br/><b>Langkah 3:</b> Ubah pangkat negatif menjadi pecahan.<br/>= a<sup>4</sup>b<sup>3</sup> / c<sup>3</sup>." },
  { q: "3. Bentuk sederhana dari pecahan 6 / (&radic;5 - &radic;3) adalah....", options: ["A. 3&radic;5 - 3&radic;3", "B. 3&radic;5 + 3&radic;3", "C. 3&radic;5 + 6&radic;3", "D. 6&radic;5 + 6&radic;3", "E. 6&radic;5 - 6&radic;3"], ans: 1, exp: "<b>Langkah 1:</b> Kalikan pembilang dan penyebut dengan akar sekawan dari penyebut, yaitu (&radic;5 + &radic;3).<br/>[6 / (&radic;5 - &radic;3)] &times; [(&radic;5 + &radic;3) / (&radic;5 + &radic;3)]<br/><b>Langkah 2:</b> Kalikan bagian penyebut menggunakan sifat (a-b)(a+b) = a<sup>2</sup> - b<sup>2</sup>.<br/>= 6(&radic;5 + &radic;3) / (5 - 3)<br/>= 6(&radic;5 + &radic;3) / 2<br/><b>Langkah 3:</b> Sederhanakan.<br/>= 3(&radic;5 + &radic;3) = 3&radic;5 + 3&radic;3." },
  { q: "4. Hasil dari <sup>2</sup>log 5 &middot; <sup>5</sup>log 16 adalah ....", options: ["A. 2", "B. 4", "C. 8", "D. 10", "E. 32"], ans: 1, exp: "<b>Langkah 1:</b> Gunakan sifat perkalian logaritma: <sup>a</sup>log b &middot; <sup>b</sup>log c = <sup>a</sup>log c.<br/><sup>2</sup>log 5 &middot; <sup>5</sup>log 16 = <sup>2</sup>log 16<br/><b>Langkah 2:</b> Hitung nilai akhirnya. Karena 2<sup>4</sup> = 16, maka <sup>2</sup>log 16 = 4." },
  { q: "5. Jika log 3 = a dan log 5 = b, maka nilai log 750 adalah ....", options: ["A. a + b", "B. a + 2b", "C. 2a + b + 1", "D. a + 2b + 1", "E. a + b<sup>2</sup> + 1"], ans: 3, exp: "<b>Langkah 1:</b> Faktorkan angka 750.<br/>750 = 3 &times; 250 = 3 &times; 25 &times; 10 = 3 &times; 5<sup>2</sup> &times; 10<br/><b>Langkah 2:</b> Pecah menggunakan sifat logaritma: log(x&middot;y) = log x + log y.<br/>log 750 = log 3 + log(5<sup>2</sup>) + log 10<br/>= log 3 + 2(log 5) + 1<br/><b>Langkah 3:</b> Substitusi nilai a dan b.<br/>= a + 2b + 1." },
  { q: "6. Suku kelima dan suku kedelapan barisan aritmatika sama dengan 18 dan 30. Suku ketiga belas adalah ...", options: ["A. 38", "B. 42", "C. 48", "D. 50", "E. 54"], ans: 3, exp: "<b>Langkah 1:</b> Buat persamaan dari rumus U<sub>n</sub> = a + (n-1)b.<br/>U<sub>8</sub> = a + 7b = 30<br/>U<sub>5</sub> = a + 4b = 18<br/><b>Langkah 2:</b> Eliminasi kedua persamaan (dikurangkan).<br/>3b = 12 &rarr; b = 4.<br/>Substitusi b=4 ke U<sub>5</sub>: a + 4(4) = 18 &rarr; a = 2.<br/><b>Langkah 3:</b> Cari U<sub>13</sub>.<br/>U<sub>13</sub> = a + 12b = 2 + 12(4) = 2 + 48 = 50." },
  { q: "7. Diketahui jumlah deret geometri tak hingga adalah 10. Jika rasionya 1/2 maka suku pertamanya adalah ....", options: ["A. 5", "B. 1/2", "C. 5/4", "D. 5/2", "E. 5/16"], ans: 0, exp: "<b>Langkah 1:</b> Gunakan rumus S<sub>&infin;</sub> = a / (1 - r).<br/>10 = a / (1 - 1/2)<br/><b>Langkah 2:</b> Selesaikan persamaannya.<br/>10 = a / (1/2)<br/>a = 10 &times; (1/2) = 5." },
  { q: "8. Hasil produksi pakaian pada bulan pertama adalah 80 setel. Setiap bulan berikutnya, hasil produksi meningkat sebanyak 10 setel membentuk deret aritmetika. Banyak hasil produksi selama 6 bulan pertama adalah....", options: ["A. 530", "B. 620", "C. 625", "D. 630", "E. 840"], ans: 3, exp: "<b>Langkah 1:</b> Identifikasi variabel. a = 80, b = 10, n = 6.<br/><b>Langkah 2:</b> Gunakan rumus jumlah deret S<sub>n</sub> = (n/2)[2a + (n-1)b].<br/>S<sub>6</sub> = (6/2) [2(80) + (5)(10)]<br/>S<sub>6</sub> = 3 [160 + 50]<br/>S<sub>6</sub> = 3 &times; 210 = 630 setel." },
  { q: "9. Selama 30 hari, Fahri mengumpulkan total 19.050 butir telur. Telur yang dikumpulkan membentuk barisan aritmetika, dan hari pertama ia mendapat 20 butir. Telur yang didapat pada hari terakhir adalah...", options: ["A. 1.210", "B. 1.220", "C. 1.230", "D. 1.240", "E. 1.250"], ans: 4, exp: "<b>Langkah 1:</b> Identifikasi data. S<sub>30</sub> = 19.050, a = 20, n = 30.<br/><b>Langkah 2:</b> Gunakan rumus cepat S<sub>n</sub> = (n/2)(a + U<sub>n</sub>).<br/>19.050 = (30/2)(20 + U<sub>30</sub>)<br/>19.050 = 15(20 + U<sub>30</sub>)<br/><b>Langkah 3:</b> Hitung U<sub>30</sub>.<br/>1.270 = 20 + U<sub>30</sub><br/>U<sub>30</sub> = 1.270 - 20 = 1.250 butir." },
  { q: "10. Harga 2 pisang, 2 apel, 1 mangga = Rp1.400. Harga 1 pisang, 1 apel, 2 mangga = Rp1.300. Harga 1 pisang, 3 apel, 1 mangga = Rp1.500. Harga 1 pisang, 1 apel, dan 1 mangga adalah ...", options: ["A. Rp 700", "B. Rp 800", "C. Rp 850", "D. Rp 900", "E. Rp 1.200"], ans: 3, exp: "<b>Langkah 1:</b> Buat model matematika (SPLTV). p=pisang, a=apel, m=mangga.<br/>1) 2p + 2a + m = 1.400<br/>2) p + a + 2m = 1.300<br/>3) p + 3a + m = 1.500<br/><b>Langkah 2:</b> Dari pers (1), 2(p+a) + m = 1.400. Dari pers (2), (p+a) + 2m = 1.300 &rarr; kalikan 2 menjadi 2(p+a) + 4m = 2.600.<br/><b>Langkah 3:</b> Eliminasi pers (1) dan pers (2) baru:<br/>(2p+2a+4m) - (2p+2a+m) = 2.600 - 1.400 &rarr; 3m = 1.200 &rarr; m = 400.<br/><b>Langkah 4:</b> Substitusi m=400 ke pers (2).<br/>p + a + 2(400) = 1.300 &rarr; p + a = 500.<br/>Maka harga 1p + 1a + 1m = 500 + 400 = Rp 900." },
  { q: "11. Nilai maksimum fungsi z = 3x + y pada daerah yang memenuhi 2x + 3y &le; 12; 2x + y &le; 8; x &ge; 0; y &ge; 0 adalah ....", options: ["A. 4", "B. 6", "C. 11", "D. 12", "E. 24"], ans: 3, exp: "<b>Langkah 1:</b> Tentukan titik potong kedua garis batas.<br/>2x + 3y = 12 dikurangi 2x + y = 8 menghasilkan 2y = 4 &rarr; y = 2. Substitusi y=2 didapat x = 3. Titik potong (3, 2).<br/><b>Langkah 2:</b> Uji titik pojok ke fungsi z = 3x + y.<br/>- (0, 4) &rarr; z = 4<br/>- (4, 0) &rarr; z = 12<br/>- (3, 2) &rarr; z = 3(3) + 2 = 11<br/>Nilai maksimumnya adalah 12." },
  { q: "12. Daerah himpunan penyelesaian dari 5x + 3y &le; 15; x + 3y &ge; 6; x &ge; 0, y &ge; 0 berbentuk...", options: ["A. Segitiga yang dibatasi oleh sumbu y", "B. Segiempat sembarang", "C. Trapesium", "D. Daerah tak terbatas di kuadran I", "E. Garis lurus"], ans: 0, exp: "<b>Pembahasan Analitis:</b> Garis 5x + 3y = 15 memotong sumbu-y di (0,5). Karena tandanya '&le;', arsirannya ke arah bawah/kiri. Garis x + 3y = 6 memotong sumbu-y di (0,2). Karena tandanya '&ge;', arsirannya ke arah atas/kanan. Keduanya dibatasi x&ge;0 (sumbu y). Irisan daerah ini membentuk area segitiga tertutup di antara sumbu-y (dari y=2 ke y=5) dan titik potong kedua garis di kuadran I." },
  { q: "13. Diketahui x<sub>1</sub> dan x<sub>2</sub> merupakan akar-akar dari x<sup>2</sup> + 3x + 2 = 0. Persamaan kuadrat baru yang akar-akarnya (x<sub>1</sub>+3) dan (x<sub>2</sub>+3) adalah ....", options: ["A. -x<sup>2</sup> - 2x - 3 = 0", "B. x<sup>2</sup> + 2x - 3 = 0", "C. x<sup>2</sup> - 2x + 3 = 0", "D. x<sup>2</sup> + 3x - 2 = 0", "E. x<sup>2</sup> - 3x + 2 = 0"], ans: 4, exp: "<b>Langkah 1:</b> Gunakan metode substitusi invers. Jika akar baru p = x + 3, maka x = p - 3.<br/><b>Langkah 2:</b> Substitusi (p - 3) ke x pada persamaan awal.<br/>(p - 3)<sup>2</sup> + 3(p - 3) + 2 = 0<br/>p<sup>2</sup> - 6p + 9 + 3p - 9 + 2 = 0<br/>p<sup>2</sup> - 3p + 2 = 0<br/>Ubah kembali p menjadi x, hasilnya: x<sup>2</sup> - 3x + 2 = 0." },
  { q: "14. Titik puncak dari parabola y = 2x<sup>2</sup> - 12x + 14 adalah.....", options: ["A. (3, 4)", "B. (3, -4)", "C. (6, 4)", "D. (6, -4)", "E. (3, 6)"], ans: 1, exp: "<b>Langkah 1:</b> Gunakan rumus absis titik puncak x<sub>p</sub> = -b / (2a).<br/>x<sub>p</sub> = -(-12) / (2&times;2) = 12 / 4 = 3.<br/><b>Langkah 2:</b> Substitusi x = 3 ke dalam persamaan y untuk mencari ordinat puncaknya.<br/>y<sub>p</sub> = 2(3)<sup>2</sup> - 12(3) + 14<br/>y<sub>p</sub> = 18 - 36 + 14 = -4.<br/>Titik puncaknya adalah (3, -4)." },
  { q: "15. Grafik parabola dari fungsi kuadrat f(x) = x<sup>2</sup> - 4 akan memotong sumbu-X pada titik...", options: ["A. (-2,0) dan (2,0)", "B. (-4,0) dan (4,0)", "C. (0,-4) saja", "D. (-2,0) dan (0,2)", "E. (0,-2) dan (0,2)"], ans: 0, exp: "<b>Langkah 1:</b> Titik potong sumbu-X terjadi saat f(x) = 0.<br/>x<sup>2</sup> - 4 = 0<br/><b>Langkah 2:</b> Faktorkan persamaan tersebut.<br/>(x - 2)(x + 2) = 0<br/>Maka x = 2 atau x = -2. Titiknya adalah (-2,0) dan (2,0)." },
  { q: "16. Diketahui segitiga ABC dengan panjang sisi AB = 3 cm, BC = 4 cm, dan AC = 5 cm. Nilai cos C adalah...", options: ["A. 4/5", "B. 2/19", "C. 13/19", "D. 5/4", "E. 5/13"], ans: 0, exp: "<b>Langkah 1:</b> Analisis jenis segitiga. Karena 3<sup>2</sup> + 4<sup>2</sup> = 5<sup>2</sup> (Tripel Pythagoras), segitiga tersebut adalah siku-siku dengan sisi miring (hipotenusa) AC = 5.<br/><b>Langkah 2:</b> Karena siku-siku menghadap sisi miring AC, maka sudut siku-siku berada di B.<br/><b>Langkah 3:</b> Hitung cos C.<br/>cos C = Sisi Samping / Sisi Miring = BC / AC = 4/5." },
  { q: "17. Noval menaiki tangga yang bersandar pada tembok. Panjang tangga tersebut 6 m dan sudut tangga di lantai 60&deg;. Tinggi ujung tangga dari permukaan lantai adalah ....", options: ["A. 2 m", "B. 3 m", "C. 3&radic;3 m", "D. 2&radic;3 m", "E. 4 m"], ans: 2, exp: "<b>Langkah 1:</b> Modelkan bentuk segitiga siku-siku. Tangga (6m) adalah sisi Miring. Tinggi dinding yang dicari adalah sisi Depan dari sudut 60&deg;.<br/><b>Langkah 2:</b> Gunakan rumus Sinus (Depan/Miring).<br/>sin 60&deg; = Tinggi / 6<br/>&radic;3 / 2 = Tinggi / 6<br/>Tinggi = 6 &times; (&radic;3 / 2) = 3&radic;3 meter." },
  { q: "18. Diagram warna favorit: Merah (75&deg;), Kuning (80&deg;), Hijau (95&deg;), Biru (sisanya). Jika siswa penyuka Hijau berjumlah 19 orang, maka jumlah penyuka Biru adalah...", options: ["A. 20 siswa", "B. 21 siswa", "C. 22 siswa", "D. 23 siswa", "E. 24 siswa"], ans: 2, exp: "<b>Langkah 1:</b> Hitung derajat warna Biru.<br/>Biru = 360&deg; - (75&deg; + 80&deg; + 95&deg;) = 360&deg; - 250&deg; = 110&deg;.<br/><b>Langkah 2:</b> Gunakan perbandingan senilai.<br/>Siswa Biru / Siswa Hijau = Derajat Biru / Derajat Hijau<br/>Siswa Biru = (110 / 95) &times; 19<br/>Siswa Biru = (110 / 5) = 22 siswa." },
  { q: "19. Rata-rata hitung (mean) dari data berkelompok berikut: (21-25)=3, (26-30)=5, (31-35)=6, (36-40)=4, (41-45)=2 adalah...", options: ["A. 31,25", "B. 32,25", "C. 33,00", "D. 33,25", "E. 38,00"], ans: 1, exp: "<b>Langkah 1:</b> Cari Nilai Tengah (x<sub>i</sub>) tiap kelas.<br/>x<sub>1</sub>=23, x<sub>2</sub>=28, x<sub>3</sub>=33, x<sub>4</sub>=38, x<sub>5</sub>=43.<br/><b>Langkah 2:</b> Kalikan x<sub>i</sub> dengan frekuensinya (f<sub>i</sub>).<br/>(3&times;23)=69, (5&times;28)=140, (6&times;33)=198, (4&times;38)=152, (2&times;43)=86. Total f<sub>i</sub>&middot;x<sub>i</sub> = 645.<br/><b>Langkah 3:</b> Hitung rata-rata.<br/>Mean = Total f<sub>i</sub>&middot;x<sub>i</sub> / Total frekuensi = 645 / 20 = 32,25." },
  { q: "20. Median dari data tabel berikut: (70-72)=5, (73-75)=8, (76-78)=13, (79-81)=7, (82-84)=7 adalah....", options: ["A. 70,88", "B. 71,63", "C. 73,23", "D. 74,54", "E. 77,12"], ans: 4, exp: "<b>Langkah 1:</b> Tentukan kelas median. Total data (N) = 40. Median ada di data ke-20. Data ke-20 berada pada kelas 76-78.<br/><b>Langkah 2:</b> Identifikasi komponen rumus. L<sub>b</sub> = 75,5; F<sub>kumulatif_sebelum</sub> = 5+8=13; f<sub>median</sub> = 13; p = 3.<br/><b>Langkah 3:</b> Hitung dengan rumus.<br/>Me = L<sub>b</sub> + [((N/2) - F) / f] &times; p<br/>Me = 75,5 + [(20 - 13) / 13] &times; 3 = 75,5 + (21 / 13)<br/>Me = 75,5 + 1,615 = 77,115 &approx; 77,12." },
  { q: "21. Modus dari data pada tabel berikut: (51-55)=8, (56-60)=11, (61-65)=17, (66-70)=13, (71-75)=9 adalah...", options: ["A. 62,5", "B. 63", "C. 63,5", "D. 54", "E. 68,5"], ans: 2, exp: "<b>Langkah 1:</b> Tentukan kelas modus (frekuensi tertinggi), yaitu kelas 61-65 dengan f=17.<br/><b>Langkah 2:</b> Identifikasi komponen. L<sub>b</sub> = 60,5; d<sub>1</sub> = 17-11=6; d<sub>2</sub> = 17-13=4; p = 5.<br/><b>Langkah 3:</b> Hitung modus.<br/>Mo = L<sub>b</sub> + [d<sub>1</sub> / (d<sub>1</sub> + d<sub>2</sub>)] &times; p<br/>Mo = 60,5 + [6 / (6+4)] &times; 5<br/>Mo = 60,5 + (30/10) = 60,5 + 3 = 63,5." },
  { q: "22. Rata-rata nilai matematika 36 siswa adalah 6,00. Ditambah 4 siswa pindahan, rata-ratanya menjadi 6,25. Nilai rata-rata 4 siswa pindahan tersebut adalah...", options: ["A. 4,16", "B. 5,40", "C. 6,12", "D. 6,94", "E. 8,50"], ans: 4, exp: "<b>Langkah 1:</b> Hitung total nilai awal. Total = 36 &times; 6,00 = 216.<br/><b>Langkah 2:</b> Hitung total nilai akhir (40 siswa). Total = 40 &times; 6,25 = 250.<br/><b>Langkah 3:</b> Kurangkan untuk mendapat total nilai 4 anak pindahan.<br/>250 - 216 = 34.<br/>Rata-rata ke-4 anak = 34 / 4 = 8,50." },
  { q: "23. Dari 15 anggota Karang Taruna akan dipilih 4 orang sebagai petugas ronda. Banyak susunan petugas yang dapat dibentuk adalah...", options: ["A. 1.365 susunan", "B. 1.246 susunan", "C. 560 susunan", "D. 480 susunan", "E. 270 susunan"], ans: 0, exp: "<b>Langkah 1:</b> Gunakan rumus Kombinasi (karena urutan orang tidak mengubah regu ronda).<br/>C(n, r) = n! / [r!(n-r)!]<br/>C(15, 4) = 15! / (4! &middot; 11!)<br/>= (15 &times; 14 &times; 13 &times; 12) / (4 &times; 3 &times; 2 &times; 1)<br/>= 1365 susunan." },
  { q: "24. Dua buah dadu dilempar bersamaan. Peluang kejadian muncul jumlah mata dadu 9 atau 11 adalah....", options: ["A. 1/18", "B. 1/9", "C. 1/6", "D. 1/2", "E. 2/3"], ans: 2, exp: "<b>Langkah 1:</b> Tentukan ruang sampel n(S). Untuk 2 dadu, n(S) = 6 &times; 6 = 36.<br/><b>Langkah 2:</b> Tentukan kejadian A (jumlah 9). A = {(3,6), (4,5), (5,4), (6,3)} &rarr; n(A) = 4.<br/><b>Langkah 3:</b> Tentukan kejadian B (jumlah 11). B = {(5,6), (6,5)} &rarr; n(B) = 2.<br/><b>Langkah 4:</b> Hitung peluang gabungan saling lepas.<br/>P(A&cup;B) = (4 + 2) / 36 = 6 / 36 = 1/6." },
  { q: "25. Tiga koin dilempar undi 80 kali. Frekuensi harapan munculnya tepat 2 angka (A) adalah... kali.", options: ["A. 15", "B. 20", "C. 25", "D. 30", "E. 35"], ans: 3, exp: "<b>Langkah 1:</b> Tentukan ruang sampel 3 koin. n(S) = 2<sup>3</sup> = 8.<br/><b>Langkah 2:</b> Kejadian 2 Angka (A) = {AAG, AGA, GAA} &rarr; n(A) = 3.<br/>Peluangnya P(A) = 3/8.<br/><b>Langkah 3:</b> Hitung Frekuensi Harapan.<br/>F<sub>h</sub> = P(A) &times; N = (3/8) &times; 80 = 30 kali." },
  { q: "26. Modal sebesar Rp 3.500.000 disimpan di bank dengan bunga majemuk 10% pertahun. Jumlah modal setelah 2 tahun adalah...", options: ["A. Rp 3.570.000", "B. Rp 4.235.000", "C. Rp 4.532.000", "D. Rp 5.432.000", "E. Rp 5.500.000"], ans: 1, exp: "<b>Langkah 1:</b> Gunakan rumus bunga majemuk: M<sub>n</sub> = M<sub>0</sub> &times; (1 + i)<sup>n</sup>.<br/><b>Langkah 2:</b> Masukkan data (M<sub>0</sub> = 3.5M, i = 0,1, n = 2).<br/>M<sub>2</sub> = 3.500.000 &times; (1 + 0,1)<sup>2</sup><br/>M<sub>2</sub> = 3.500.000 &times; (1,1)<sup>2</sup> = 3.500.000 &times; 1,21<br/>M<sub>2</sub> = Rp 4.235.000." },
  { q: "27. Sebuah baju memiliki harga awal Rp 250.000. Jika pemuda tersebut membelinya setelah mendapatkan diskon 20%, berapakah yang harus dibayar pada kasir?", options: ["A. Rp 200.000", "B. Rp 300.000", "C. Rp 150.000", "D. Rp 100.000", "E. Rp 50.000"], ans: 0, exp: "<b>Langkah 1:</b> Hitung nominal diskon.<br/>Diskon = 20% &times; 250.000 = (20/100) &times; 250.000 = 50.000.<br/><b>Langkah 2:</b> Kurangkan dari harga awal.<br/>Harga Bayar = 250.000 - 50.000 = Rp 200.000.<br/><i>(Catatan: Asumsi harga awal Rp 250rb disisipkan agar soal lengkap dan memiliki jawaban valid sesuai pilihan A)</i>" },
  { q: "28. Ihwan menabung Rp 200.000 dengan bunga tunggal 15% setahun. Besar tabungan Ihwan setelah 8 bulan adalah...", options: ["A. Rp 220.000", "B. Rp 200.000", "C. Rp 150.000", "D. Rp 100.000", "E. Rp 120.000"], ans: 0, exp: "<b>Langkah 1:</b> Hitung besar bunga tunggal.<br/>Bunga = M &times; P &times; (Bulan/12)<br/>Bunga = 200.000 &times; 15% &times; (8/12)<br/>Bunga = 200.000 &times; 0,15 &times; (2/3) = 30.000 &times; 2/3 = 20.000.<br/><b>Langkah 2:</b> Jumlahkan ke tabungan awal.<br/>Total = 200.000 + 20.000 = Rp 220.000." },
  { q: "29. Jika f(x) = 2x<sup>2</sup> + 3x - 4, maka nilai f(-2) = ....", options: ["A. -2", "B. -18", "C. 18", "D. 2", "E. 6"], ans: 0, exp: "<b>Langkah 1:</b> Substitusi nilai x dengan -2 ke dalam fungsi.<br/>f(-2) = 2(-2)<sup>2</sup> + 3(-2) - 4<br/>f(-2) = 2(4) - 6 - 4<br/>f(-2) = 8 - 10 = -2." },
  { q: "30. Jika f(x) = 2x + 3 dan g(x) = x<sup>2</sup> + 1, maka (f &circ; g)(2) = ...", options: ["A. 3", "B. 7", "C. 13", "D. 15", "E. 11"], ans: 2, exp: "<b>Langkah 1:</b> Cari nilai g(2) terlebih dahulu.<br/>g(2) = (2)<sup>2</sup> + 1 = 4 + 1 = 5.<br/><b>Langkah 2:</b> Substitusi hasil tersebut ke dalam fungsi f(x).<br/>f(g(2)) = f(5) = 2(5) + 3 = 10 + 3 = 13." },
  { q: "31. Jika f(x) = x<sup>2</sup> - 3x + 2 dan g(x) = 4x + 1, maka komposisi (g &circ; f)(x) = .....", options: ["A. 4x<sup>2</sup> + 12x + 9", "B. 4x<sup>2</sup> - 3x + 8", "C. 4x<sup>2</sup> - 3x - 8", "D. 4x<sup>2</sup> - 12x + 9", "E. 4x<sup>2</sup> - 12x + 8"], ans: 3, exp: "<b>Langkah 1:</b> Masukkan seluruh fungsi f(x) ke dalam variabel x pada fungsi g(x).<br/>g(f(x)) = 4(f(x)) + 1<br/>= 4(x<sup>2</sup> - 3x + 2) + 1<br/><b>Langkah 2:</b> Kalikan masuk.<br/>= 4x<sup>2</sup> - 12x + 8 + 1<br/>= 4x<sup>2</sup> - 12x + 9." },
  { q: "32. Diketahui fungsi f(x) = x + 10, maka f<sup>-1</sup>(2) adalah...", options: ["A. 8", "B. -8", "C. 6", "D. -6", "E. 4"], ans: 1, exp: "<b>Langkah 1:</b> Arti dari f<sup>-1</sup>(2) adalah mencari nilai x saat fungsi f(x) bernilai 2.<br/>x + 10 = 2<br/>x = 2 - 10<br/>x = -8." },
  { q: "33. Diketahui fungsi f dengan rumus f(x) = 2x - 3, maka nilai f<sup>-1</sup>(-1) adalah...", options: ["A. 1", "B. -1", "C. 2", "D. -2", "E. 3"], ans: 0, exp: "<b>Langkah 1:</b> Sama seperti sebelumnya, samakan fungsi f(x) dengan nilai invers yang dicari.<br/>2x - 3 = -1<br/>2x = -1 + 3<br/>2x = 2 &rarr; x = 1." },
  { q: "34. Diketahui f(x) = x<sup>2</sup> - 3 dan g(x) = 2x - 1. Komposisi fungsi (f &circ; g)(x) = ....", options: ["A. 2x<sup>2</sup> - 2x - 3", "B. 2x<sup>2</sup> + 2x - 1", "C. 4x<sup>2</sup> - 2", "D. 4x<sup>2</sup> - 4x - 2", "E. 4x<sup>2</sup> - 4x - 4"], ans: 3, exp: "<b>Langkah 1:</b> Masukkan g(x) ke dalam f(x).<br/>f(g(x)) = (2x - 1)<sup>2</sup> - 3<br/><b>Langkah 2:</b> Jabarkan bentuk kuadrat (a-b)<sup>2</sup> = a<sup>2</sup> - 2ab + b<sup>2</sup>.<br/>= (4x<sup>2</sup> - 4x + 1) - 3<br/>= 4x<sup>2</sup> - 4x - 2." },
  { q: "35. Persamaan lingkaran yang berpusat di (-3, 5) dan menyinggung sumbu-x adalah...", options: ["A. x<sup>2</sup> + y<sup>2</sup> + 6x - 10y + 9 = 0", "B. x<sup>2</sup> + y<sup>2</sup> - 6x - 10y + 9 = 0", "C. x<sup>2</sup> + y<sup>2</sup> - 6x + 10y + 9 = 0", "D. x<sup>2</sup> + y<sup>2</sup> - 10x - 6y + 9 = 0", "E. x<sup>2</sup> + y<sup>2</sup> + 10x - 6y + 9 = 0"], ans: 0, exp: "<b>Langkah 1:</b> Jari-jari lingkaran yang menyinggung sumbu-x adalah nilai mutlak dari ordinat pusat (y). Maka r = |5| = 5.<br/><b>Langkah 2:</b> Masukkan ke rumus (x-a)<sup>2</sup> + (y-b)<sup>2</sup> = r<sup>2</sup>.<br/>(x - (-3))<sup>2</sup> + (y - 5)<sup>2</sup> = 5<sup>2</sup><br/>(x + 3)<sup>2</sup> + (y - 5)<sup>2</sup> = 25<br/><b>Langkah 3:</b> Jabarkan.<br/>x<sup>2</sup> + 6x + 9 + y<sup>2</sup> - 10y + 25 = 25<br/>x<sup>2</sup> + y<sup>2</sup> + 6x - 10y + 9 = 0." },
  { q: "36. Sebuah lingkaran dengan sudut pusat AOB 60&deg;. Jika jari-jari lingkaran 7 cm, maka panjang busur AOB adalah....", options: ["A. 20 cm", "B. 15 cm", "C. 14,6 cm", "D. 7,3 cm", "E. 6,5 cm"], ans: 3, exp: "<b>Langkah 1:</b> Gunakan rumus Panjang Busur = (&alpha;/360&deg;) &times; Keliling Lingkaran.<br/>P. Busur = (60/360) &times; 2 &times; &pi; &times; r<br/>= (1/6) &times; 2 &times; (22/7) &times; 7<br/>= (1/6) &times; 44 = 44 / 6 = 7,333... cm." },
  { q: "37. Diketahui tan A = 12/5, sin B = 4/5. A adalah sudut lancip dan B sudut tumpul. Nilai cos(A-B) adalah...", options: ["A. 63/65", "B. 56/65", "C. 36/65", "D. 33/65", "E. 16/65"], ans: 3, exp: "<b>Langkah 1:</b> Sudut A (Lancip / Kuadran I): tan A = 12/5. Sisi miring = &radic;(12<sup>2</sup>+5<sup>2</sup>) = 13. Maka sin A = 12/13, cos A = 5/13.<br/><b>Langkah 2:</b> Sudut B (Tumpul / Kuadran II): sin B = 4/5. Samping = &radic;(5<sup>2</sup>-4<sup>2</sup>) = 3. Di K-II, nilai cos negatif, maka cos B = -3/5.<br/><b>Langkah 3:</b> Rumus cos(A-B) = cos A &middot; cos B + sin A &middot; sin B.<br/>= (5/13)(-3/5) + (12/13)(4/5)<br/>= (-15/65) + (48/65) = 33/65." },
  { q: "38. (Bonus Re-Test) Diketahui fungsi f(x) = x + 10, maka nilai dari f<sup>-1</sup>(2) adalah...", options: ["A. 10", "B. 8", "C. -8", "D. -10", "E. 12"], ans: 2, exp: "<b>Langkah 1:</b> Sama seperti soal no 32, samakan persamaannya.<br/>x + 10 = 2 &rarr; x = -8." },
  { q: "39. Nilai eksak dari fungsi trigonometri sin 120&deg; adalah ....", options: ["A. -1/2 &radic;3", "B. -1/2 &radic;2", "C. 1/2", "D. 1/2 &radic;2", "E. 1/2 &radic;3"], ans: 4, exp: "<b>Langkah 1:</b> Identifikasi kuadran. Sudut 120&deg; berada di Kuadran II, yang berarti nilai sinus bernilai positif.<br/><b>Langkah 2:</b> Gunakan relasi sudut sin(180&deg; - &alpha;) = sin &alpha;.<br/>sin(180&deg; - 60&deg;) = sin 60&deg;<br/>= 1/2 &radic;3." },
  { q: "40. Diketahui tan a = 6/8 untuk interval 180&deg; &le; a &le; 270&deg;. Nilai dari sin a adalah...", options: ["A. -8/10", "B. -6/10", "C. 6/10", "D. 8/6", "E. 1"], ans: 1, exp: "<b>Langkah 1:</b> Sudut 180&deg;-270&deg; adalah Kuadran III. Pada Kuadran III, nilai sinus (sin) adalah NEGATIF.<br/><b>Langkah 2:</b> Dari tan a = 6/8 (Depan=6, Samping=8), hitung sisi Miring.<br/>Miring = &radic;(6<sup>2</sup> + 8<sup>2</sup>) = &radic;100 = 10.<br/><b>Langkah 3:</b> Hitung sin a = -(Depan/Miring) = -6/10." }
];

const essayData: Essay[] = [
  { q: "41. (Statistika) Data penjualan di lima kota adalah: A=1243, B=2312, C=4321, D=1321, E=3532. Jika data ini digambarkan dalam Diagram Lingkaran, berapakah derajat potongan juring untuk Kota C?", exp: "<b>Penyelesaian:</b><br/>1. Hitung total keseluruhan penjualan.<br/>Total = 1.243 + 2.312 + 4.321 + 1.321 + 3.532 = 12.729.<br/><br/>2. Hitung derajat juring untuk Kota C menggunakan perbandingan.<br/>Derajat = (Penjualan C / Total) &times; 360&deg;<br/>Derajat = (4.321 / 12.729) &times; 360&deg; &approx; 122,2&deg;." },
  { q: "42. (Eksponen) Tentukan bentuk sederhana dari ((x<sup>4</sup> y<sup>3</sup> z<sup>-3</sup>) / (x<sup>2</sup> y<sup>4</sup> z<sup>-2</sup>))<sup>2</sup> !", exp: "<b>Penyelesaian:</b><br/>1. Selesaikan operasi pembagian (pengurangan pangkat) di dalam kurung terlebih dahulu.<br/>x<sup>4-2</sup> &middot; y<sup>3-4</sup> &middot; z<sup>-3-(-2)</sup> = x<sup>2</sup> &middot; y<sup>-1</sup> &middot; z<sup>-1</sup><br/><br/>2. Pangkatkan hasil tersebut dengan 2 (kalikan semua pangkatnya).<br/>(x<sup>2</sup> &middot; y<sup>-1</sup> &middot; z<sup>-1</sup>)<sup>2</sup> = x<sup>4</sup> &middot; y<sup>-2</sup> &middot; z<sup>-2</sup><br/><br/>3. Ubah pangkat negatif menjadi pecahan.<br/>= x<sup>4</sup> / (y<sup>2</sup> z<sup>2</sup>)." },
  { q: "43. (Fungsi Komposisi) Diketahui f(x) = 2x - 7 dan g(x) = 3x + 5. Hitunglah nilai dari komposisi (f &circ; g)(3) !", exp: "<b>Penyelesaian:</b><br/>1. Substitusi x = 3 ke dalam fungsi g(x) terlebih dahulu.<br/>g(3) = 3(3) + 5 = 9 + 5 = 14.<br/><br/>2. Masukkan hasil g(3) tersebut ke dalam fungsi f(x).<br/>f(g(3)) = f(14) = 2(14) - 7<br/>= 28 - 7 = 21.<br/><br/>Jadi, nilai akhir komposisinya adalah 21." },
  { q: "44. (Turunan/Kalkulus) Tentukan turunan pertama f'(x) dari fungsi f(x) = (2x<sup>2</sup> - 3x)(x + 5) !", exp: "<b>Penyelesaian:</b><br/>1. Jabarkan (kalikan silang) bentuk aljabar tersebut sebelum diturunkan.<br/>f(x) = 2x<sup>3</sup> + 10x<sup>2</sup> - 3x<sup>2</sup> - 15x<br/>f(x) = 2x<sup>3</sup> + 7x<sup>2</sup> - 15x<br/><br/>2. Terapkan aturan turunan fungsi aljabar (f'(x) = a&middot;n x<sup>n-1</sup>).<br/>f'(x) = (2&times;3)x<sup>2</sup> + (7&times;2)x<sup>1</sup> - 15<br/>f'(x) = 6x<sup>2</sup> + 14x - 15." },
  { q: "45. (Peluang) Sebuah dadu dan sebuah keping uang logam dilempar undi bersama-sama satu kali. Tentukan peluang munculnya mata dadu genap dan sisi angka pada uang logam!", exp: "<b>Penyelesaian:</b><br/>1. Tentukan peluang pada Dadu (Kejadian A).<br/>Angka genap pada dadu = {2, 4, 6}. Maka n(A) = 3. Ruang sampel dadu n(S<sub>1</sub>) = 6.<br/>P(A) = 3/6 = 1/2.<br/><br/>2. Tentukan peluang pada Logam (Kejadian B).<br/>Sisi Angka. n(B) = 1. Ruang sampel logam n(S<sub>2</sub>) = 2.<br/>P(B) = 1/2.<br/><br/>3. Hitung peluang gabungan saling bebas (dikalikan).<br/>P(A &cap; B) = P(A) &times; P(B) = 1/2 &times; 1/2 = 1/4." }
];

export default function SimulasiMatematikaPage() {
  // --- STATES ---
  const [view, setView] = useState<'landing' | 'quiz' | 'essay'>('landing');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mcqData.length).fill(null));
  const [showModal, setShowModal] = useState<boolean>(false);

  // --- HANDLERS ---
  const handleStart = () => {
    setView('quiz');
    setCurrentIndex(0);
    setScore(0);
    setAnswers(Array(mcqData.length).fill(null));
  };

  const handleAnswer = (index: number) => {
    if (answers[currentIndex] !== null) return;
    
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = index;
      return newAnswers;
    });
    
    if (index === mcqData[currentIndex].ans) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleGoToEssays = () => {
    setShowModal(false);
    setView('essay');
    window.scrollTo(0, 0);
  };

  // --- RENDERERS ---
  const renderLanding = () => (
    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-indigo-600">
      <div className="text-6xl mb-6 flex justify-center gap-4 text-indigo-500 font-serif">
        <span>&int;</span><span>&Sigma;</span><span>&radic;x</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi Ujian Matematika</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Uji kemampuan logikamu mulai dari eksponen, logaritma, trigonometri, hingga statistika. Jawaban telah dilengkapi dengan perhitungan step-by-step!
      </p>
      <button 
        onClick={handleStart}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-600/40 text-lg tracking-wide"
      >
        Mulai Menghitung &sum;
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-4 border-indigo-600">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
            Soal {currentIndex + 1} / {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-blue-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
          <h2 
            className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed font-serif tracking-wide"
            dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 font-serif">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center ";
            
            if (!hasAnswered) {
              btnClass += "border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 cursor-pointer hover:translate-x-1 hover:shadow-md";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-500 bg-rose-50 text-rose-800 shadow-sm";
              } else {
                btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
              }
            }

            return (
              <button 
                key={i} 
                onClick={() => handleAnswer(i)}
                disabled={hasAnswered}
                className={btnClass}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-sm ${!hasAnswered ? 'bg-slate-100 text-slate-600' : isCorrect ? 'bg-emerald-200 text-emerald-800' : isSelected ? 'bg-rose-200 text-rose-800' : 'bg-slate-100 text-slate-400'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-lg" dangerouslySetInnerHTML={{ __html: opt.substring(3) }} />
              </button>
            );
          })}
        </div>

        {/* Feedback Section (Step-by-Step) */}
        {hasAnswered && (
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-inner border-l-4 ${selectedOption === currentQuestion.ans ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
            <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-emerald-700' : 'text-rose-700'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Analisis Tepat!' : '❌ Perhitungan Meleset'}
            </h4>
            <div className="text-slate-700 leading-loose font-serif text-md bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
              <span dangerouslySetInnerHTML={{ __html: currentQuestion.exp }} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm ${currentIndex === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transform hover:-translate-x-1'}`}
          >
            &larr; Prev
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:translate-x-1 ${currentIndex === mcqData.length - 1 ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/40' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesai & Cek Skor 🏁' : 'Next &rarr;'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full mx-auto animate-fade-in-up border-t-8 border-indigo-600">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Review Pemecahan Masalah (Esai)</h2>
        <p className="text-slate-500">Pelajari algoritma dan alur logika perhitungan di bawah ini dengan seksama.</p>
      </div>
      
      <div className="flex flex-col gap-8">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h3 
              className="font-bold text-indigo-800 mb-4 text-xl border-b-2 border-indigo-100 pb-3 font-serif"
              dangerouslySetInnerHTML={{ __html: item.q }}
            />
            <div 
              className="text-slate-700 leading-loose font-serif bg-white p-5 rounded-xl border border-slate-100 shadow-inner"
              dangerouslySetInnerHTML={{ __html: item.exp }} 
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={handleStart}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-slate-800/50 hover:-translate-y-1 tracking-wide"
        >
          &#8634; Ulangi Latihan Matematika
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-100 to-blue-50">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4 text-indigo-500 font-serif">&Sigma;</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Kalkulasi Selesai!</h2>
            <p className="text-slate-500 mb-8">Akurasi logikamu mencapai:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" 
                 style={{ background: `conic-gradient(#4f46e5 ${finalScore}%, #e2e8f0 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg">
                <span className="text-6xl font-black text-indigo-600 drop-shadow-sm">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4 leading-relaxed">
              {finalScore >= 85 ? "Jenius! Kemampuan analisismu sangat tajam. 🏆" : finalScore >= 70 ? "Cukup Baik! Lebih teliti lagi saat eliminasi/substitusi. 📈" : "Jangan Menyerah! Matematika adalah soal repetisi latihan. 🧠"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1 tracking-wide"
            >
              Lihat Kunci Pembahasan Esai &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Internal CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}