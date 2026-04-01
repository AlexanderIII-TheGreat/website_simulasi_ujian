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

// --- BROMO TEXT ---
const bromoText = `<div class="bg-violet-100/50 p-4 rounded-xl border border-violet-200 mb-4 text-sm text-slate-700 italic"><b>Mount Bromo</b><br/>Mount Bromo is one of the most popular tourist destinations in East Java, Indonesia. It is an active volcano located inside the Bromo Tengger Semeru National Park. Although it is not the highest peak in the area, it is the most famous.<br/><br/>The mountain has a breathtaking view, especially during sunrise. Many tourists from all over the world come early in the morning to witness the golden sunrise from Penanjakan Hill. Around the volcano, there is a vast desert of black sand known as the "Sea of Sand." Visitors usually rent a jeep or ride a horse to cross this unique landscape.</div>`;

// --- PROCEDURE TEXT ---
const procedureText = `<div class="bg-violet-100/50 p-4 rounded-xl border border-violet-200 mb-4 text-sm text-slate-700 italic"><b>How to Connect a Bluetooth Speaker to a Laptop</b><br/>1. <b>First</b>, make sure that your Bluetooth speaker is fully charged and turned on.<br/>2. <b>Then</b>, press the Bluetooth pairing button on your speaker until the indicator light flashes.<br/>3. On your laptop, click the Start button and open the 'Settings' menu.<br/>4. Select 'Devices', and click 'Bluetooth & other devices'.<br/>5. Turn on the Bluetooth toggle switch.<br/>6. Click 'Add Bluetooth or other device' and choose 'Bluetooth'.<br/>7. Wait for your laptop to scan. When the name of your speaker appears on the screen, click it to connect.<br/>8. <b>Finally</b>, play some music to test the audio output.</div>`;

// --- RECOUNT TEXT ---
const recountText = `<div class="bg-violet-100/50 p-4 rounded-xl border border-violet-200 mb-4 text-sm text-slate-700 italic"><b>My Industrial Practice Experience</b><br/>Two months ago, I had the opportunity to do my industrial practice (Prakerin) at an official motorcycle workshop in my town. I was very nervous on my first day, but the senior mechanics were very friendly and welcoming.<br/><br/>Every day, I woke up early at 6 AM. I didn't want to be late. My daily tasks included helping the mechanics prepare the tools, changing the engine oil, and cleaning the workshop area after closing. During the second week, a senior mechanic, Mr. Budi, [......] me how to check the brake system properly. It was challenging, but I enjoyed learning it.<br/><br/>Overall, my internship was an unforgettable experience. I learned many new practical skills that I couldn't get in the classroom.</div>`;

// --- NARRATIVE TEXT ---
const narrativeText = `<div class="bg-violet-100/50 p-4 rounded-xl border border-violet-200 mb-4 text-sm text-slate-700 italic"><b>The Smart Fox and the Greedy Wolf</b><br/>Once upon a time, a fox and a wolf were walking through the forest. The wolf was very hungry and kept complaining. Suddenly, they saw a piece of meat left by a hunter inside the hollow of a big tree.<br/><br/>The hole was very small. The smart fox realized it was a trap, so he didn't go in. However, the greedy wolf didn't care. He squeezed himself through the tiny hole and ate all the meat greedily. His stomach became so big and round that he couldn't get out of the hole anymore.<br/><br/>"Help me, Fox! I am stuck!" cried the wolf.<br/><br/>The fox shook his head and said, "You should have controlled your appetite. Now you have to wait until your stomach shrinks back to normal." The fox then walked away, leaving the greedy wolf trapped inside the tree.</div>`;

// --- DATA SOAL BAHASA INGGRIS ---
const mcqData: MCQ[] = [
  { q: "<b>Man:</b> 'In my opinion, having good soft skills like communication and teamwork is very crucial for vocational school (SMK) students before entering the real workplace.'<br/><b>Woman:</b> '...' <br/><br/>What is the most relevant and logical response to the man's statement?", options: ["A. I disagree, machines do all the work now.", "B. I couldn't agree more, it helps them to collaborate and solve problems effectively.", "C. Soft skills are only for college students, not us.", "D. I think hard skills like repairing engines are completely useless.", "E. Why do you think teamwork is a bad idea?"], ans: 1, exp: "Respon yang paling logis untuk menyetujui pentingnya soft skills adalah opsi B, karena memberikan alasan yang mendukung (kolaborasi dan pemecahan masalah)." },
  { q: "<b>Woman:</b> 'I believe that mastering English is extremely important for our future careers, especially in this global era.'<br/><b>Man:</b> '...' <br/><br/>Which response shows agreement accompanied by a relevant reason?", options: ["A. I doubt that, we only work in our hometown.", "B. I am not sure about that, learning English is difficult.", "C. You are absolutely right; many multinational companies require it as a basic qualification.", "D. I totally agree, but I don't like speaking English.", "E. That's true, because English is only spoken in England."], ans: 2, exp: "Opsi C menunjukkan persetujuan ('You are absolutely right') yang disertai alasan logis yang relevan dengan dunia kerja multinasional." },
  { q: "Look at the picture of the classroom. It has spotless floors, neatly arranged desks, and many educational posters on the wall.<br/><br/>Which of the following opinions best describes the situation?", options: ["A. I think the students are very lazy to clean it.", "B. In my opinion, the classroom is too dark and messy.", "C. I feel that it is a very comfortable and inspiring place to study.", "D. I believe the posters are distracting the students.", "E. To my mind, the classroom needs a lot of renovation."], ans: 2, exp: "Berdasarkan deskripsi kelas yang bersih (spotless) dan penuh poster edukasi, opini yang paling tepat adalah kelas tersebut nyaman dan menginspirasi (opsi C)." },
  { q: bromoText + "What is the communicative purpose of the text above?", options: ["A. To retell the writer's past experience in Mount Bromo.", "B. To amuse the readers with the legend of Mount Bromo.", "C. To persuade the readers to protect active volcanoes.", "D. To describe a particular place, which is Mount Bromo.", "E. To explain how Mount Bromo was formed."], ans: 3, exp: "Teks tersebut adalah Descriptive Text yang bertujuan secara spesifik untuk mendeskripsikan tempat tertentu (To describe a particular place), yaitu Gunung Bromo." },
  { q: bromoText + "What is the dominant tense used in the text?", options: ["A. Simple Past Tense", "B. Present Continuous Tense", "C. Simple Present Tense", "D. Past Perfect Tense", "E. Future Tense"], ans: 2, exp: "Teks deskriptif menggunakan Simple Present Tense untuk menyatakan fakta dan kondisi yang ada saat ini (contoh: 'Mount Bromo is...', 'Visitors usually rent...')." },
  { q: bromoText + "Where is Mount Bromo located?", options: ["A. Inside the Sea of Sand", "B. At the top of Penanjakan Hill", "C. Inside the Bromo Tengger Semeru National Park", "D. In the highest peak of East Java", "E. Outside the desert of black sand"], ans: 2, exp: "Informasi tersurat di kalimat kedua paragraf pertama: 'It is an active volcano located inside the Bromo Tengger Semeru National Park.'" },
  { q: bromoText + "'The mountain has a <b>breathtaking</b> view...' (Paragraph 2).<br/>The antonym of the bold word is...", options: ["A. Amazing", "B. Stunning", "C. Ugly", "D. Spectacular", "E. Beautiful"], ans: 2, exp: "Breathtaking berarti sangat menakjubkan/indah. Antonim (lawan kata) yang paling tepat adalah Ugly (jelek)." },
  { q: bromoText + "'<b>It</b> is an active volcano located inside...' (Paragraph 1).<br/>The word 'It' refers to...", options: ["A. East Java", "B. Mount Bromo", "C. The National Park", "D. The highest peak", "E. The Sea of Sand"], ans: 1, exp: "Kata ganti 'It' merujuk pada subjek tunggal di kalimat sebelumnya, yaitu 'Mount Bromo'." },
  { q: "Which of the following sentences from a descriptive text uses the Simple Present Tense correctly?", options: ["A. The mechanic repaired the car yesterday.", "B. The factory producing a lot of high-quality products every day.", "C. The new smart TV features a 4K resolution and voice control.", "D. The technicians is fixing the network issue right now.", "E. The building will be demolished next year."], ans: 2, exp: "Opsi C menggunakan pola Simple Present Tense (Subject + V1 s/es) dengan benar: 'The new smart TV (S) features (V1+s)...'" },
  { q: "The Smartwatch X200 is equipped with a heart rate monitor, a step counter, and a blood oxygen sensor. It can also connect to your smartphone to display messages and calls.<br/><br/>What is the main function of the tool described above?", options: ["A. To take high-quality photographs.", "B. To track the user's health and display phone notifications.", "C. To fix broken electronic devices.", "D. To play heavy video games.", "E. To print documents wirelessly."], ans: 1, exp: "Fitur yang dideskripsikan (memonitor jantung, langkah, oksigen, pesan) menunjukkan fungsi utamanya adalah melacak kesehatan dan menampilkan notifikasi." },
  { q: "<i>'Visitors usually rent a jeep or ride a horse to cross this <b>unique</b> landscape.'</i><br/><br/>The word 'unique' means...", options: ["A. Very common and ordinary", "B. Being the only one of its kind; special", "C. Very boring and tiring", "D. Dangerous and scary", "E. Hard to find"], ans: 1, exp: "Unique berarti unik, istimewa, atau satu-satunya dari jenisnya (being the only one of its kind)." },
  { q: procedureText + "What should you do after opening the 'Settings' menu on your laptop?", options: ["A. Play some music.", "B. Press the pairing button on the speaker.", "C. Turn on the Bluetooth toggle switch.", "D. Select 'Devices' and click 'Bluetooth & other devices'.", "E. Click 'Add Bluetooth'."], ans: 3, exp: "Sesuai teks, langkah ke-3 membuka Settings, kemudian langkah ke-4 adalah 'Select Devices, and click Bluetooth & other devices'." },
  { q: procedureText + "The text above mainly consists of...", options: ["A. Orientation, Events, Reorientation", "B. Goal, Materials/Equipment, Steps", "C. General Classification, Description", "D. Identification, Description", "E. Thesis, Arguments, Recommendation"], ans: 1, exp: "Teks prosedur (Procedure text) memiliki struktur generik: Goal (Tujuan), Materials (Bahan/Alat), dan Steps (Langkah-langkah)." },
  { q: procedureText + "Why do we need to press the pairing button on the speaker until the light flashes?", options: ["A. To increase the volume of the speaker.", "B. To turn off the device safely.", "C. To make the speaker discoverable by the laptop.", "D. To charge the battery of the speaker.", "E. To play the music directly."], ans: 2, exp: "Alasan logis menekan tombol pairing hingga berkedip adalah agar sinyal Bluetooth memancar dan dapat dideteksi (discoverable) oleh perangkat lain." },
  { q: procedureText + "'...click it to <b>connect</b>.' (Step 7)<br/><br/>The synonym of the word 'connect' is...", options: ["A. Disconnect", "B. Separate", "C. Link", "D. Break", "E. Remove"], ans: 2, exp: "Sinonim (persamaan makna) dari connect (menghubungkan) adalah link atau join." },
  { q: procedureText + "Which words from the text are categorized as temporal conjunctions?", options: ["A. Make, press, click", "B. First, then, finally", "C. On, to, for", "D. Speaker, laptop, button", "E. Flashes, appears, test"], ans: 1, exp: "Temporal conjunctions (kata sambung waktu) yang menunjukkan urutan langkah adalah First (pertama), Then (kemudian), Finally (terakhir)." },
  { q: procedureText + "Which of the following is an imperative sentence found in the text?", options: ["A. Your Bluetooth speaker is fully charged.", "B. The name of your speaker appears on the screen.", "C. Wait for your laptop to scan.", "D. It can also connect to your smartphone.", "E. The indicator light flashes."], ans: 2, exp: "Kalimat imperatif (perintah) diawali dengan kata kerja (Verb 1). 'Wait for your laptop to scan' adalah kalimat perintah." },
  { q: procedureText + "What is the final step of the procedure?", options: ["A. Turn on the speaker.", "B. Play some music to test the audio.", "C. Click the start button.", "D. Turn on the Bluetooth toggle.", "E. Charge the speaker."], ans: 1, exp: "Langkah terakhir (langkah 8) secara eksplisit tertulis: 'Finally, play some music to test the audio output.'" },
  { q: "<i>'If the screen is dirty, <b>apply</b> a few drops of screen cleaner to the cloth.'</i><br/><br/>In this context, the word 'apply' means...", options: ["A. To submit an application letter.", "B. To put or spread something onto a surface.", "C. To ask for something formally.", "D. To press a button strongly.", "E. To wipe with a lot of pressure."], ans: 1, exp: "Dalam konteks membersihkan layar, 'apply a few drops' berarti menaruh atau mengoleskan cairan ke permukaan (put or spread something onto a surface)." },
  { q: "Which of the following is a correct Passive Voice sentence?", options: ["A. The technician repairs the computer carefully.", "B. You must press the power button.", "C. The software was installed by the IT support yesterday.", "D. He is typing a long document right now.", "E. They will buy a new server tomorrow."], ans: 2, exp: "Passive Voice (kalimat pasif) ditandai dengan pola Be + Verb 3. 'The software was installed...' adalah bentuk pasif yang benar." },
  { q: "Arrange these jumbled words into a correct imperative sentence!<br/><b>( tightly - the - screw - rotate - clockwise )</b>", options: ["A. The screw rotate clockwise tightly.", "B. Rotate the screw clockwise tightly.", "C. Tightly the screw rotate clockwise.", "D. Clockwise rotate tightly the screw.", "E. The rotate screw tightly clockwise."], ans: 1, exp: "Kalimat perintah harus diawali Verb 1. Susunan yang benar: Rotate (Putar) the screw (sekrup itu) clockwise (searah jarum jam) tightly (dengan kencang)." },
  { q: recountText + "What is the main idea of the second paragraph?", options: ["A. The writer's feeling on the first day.", "B. The writer's daily activities and tasks during the practice.", "C. The location of the official motorcycle workshop.", "D. Mr. Budi's background as a senior mechanic.", "E. The conclusion of the industrial practice."], ans: 1, exp: "Paragraf kedua menceritakan rutinitas jam bangun, tugas-tugas harian, dan pengalaman belajar servis. Intinya adalah aktivitas/tugas selama praktik." },
  { q: recountText + "'During the second week, a senior mechanic, Mr. Budi, [......] me how to check the brake system properly.'<br/><br/>Which word best fills the blank?", options: ["A. taught", "B. teaches", "C. teaching", "D. teach", "E. has taught"], ans: 0, exp: "Recount text menceritakan kejadian masa lalu, sehingga harus menggunakan Simple Past Tense (Verb 2). Verb 2 dari teach adalah taught." },
  { q: recountText + "'I was very <b>nervous</b> on my first day...'<br/><br/>The antonym of 'nervous' is...", options: ["A. Anxious", "B. Worried", "C. Calm", "D. Afraid", "E. Confused"], ans: 2, exp: "Nervous berarti gugup. Lawan kata (antonim) yang tepat adalah Calm (tenang) atau Confident (percaya diri)." },
  { q: recountText + "What is the text mostly about?", options: ["A. A guide on how to repair a motorcycle.", "B. The writer's past experience during an industrial practice.", "C. The history of an official workshop.", "D. A description of Mr. Budi's characteristics.", "E. An argument why vocational students need practice."], ans: 1, exp: "Teks ini adalah Recount Text yang menceritakan kembali pengalaman masa lalu penulis selama mengikuti Prakerin." },
  { q: recountText + "'I had the <b>opportunity</b> to do my industrial practice...'<br/><br/>The synonym of the bold word is...", options: ["A. Difficulty", "B. Trouble", "C. Chance", "D. Problem", "E. Money"], ans: 2, exp: "Opportunity berarti kesempatan atau peluang. Sinonimnya adalah Chance." },
  { q: recountText + "The last paragraph of the text serves as the...", options: ["A. Orientation", "B. Complication", "C. Resolution", "D. Reorientation", "E. Steps"], ans: 3, exp: "Paragraf terakhir dalam Recount Text yang berisi kesimpulan/komentar pribadi penulis terhadap pengalaman tersebut disebut Reorientation." },
  { q: recountText + "Why did the writer wake up early every day?", options: ["A. Because he wanted to go home early.", "B. Because he was very nervous.", "C. Because he didn't want to be late for his practice.", "D. Because Mr. Budi asked him to do so.", "E. Because he had to repair the brake system."], ans: 2, exp: "Alasan ini tertulis eksplisit di teks: 'Every day, I woke up early at 6 AM. I didn't want to be late.' (Saya tidak ingin terlambat)." },
  { q: recountText + "The social function of the text is...", options: ["A. To entertain the readers with a fairy tale.", "B. To describe the physical appearance of a workshop.", "C. To instruct the readers on how to change engine oil.", "D. To retell past events or experiences for the purpose of informing.", "E. To persuade the readers to open a workshop."], ans: 3, exp: "Fungsi sosial dari Recount text adalah menceritakan kembali kejadian/pengalaman di masa lalu untuk memberi informasi (To retell past events)." },
  { q: "Which of the following is a correct Simple Past Tense sentence?", options: ["A. I go to the workshop every morning.", "B. The mechanic is fixing the engine right now.", "C. I learned many new practical skills.", "D. They will finish the project next month.", "E. She has cleaned the area."], ans: 2, exp: "Simple Past Tense menggunakan Verb 2. Pada kalimat C, subjek 'I' diikuti Verb 2 'learned'." },
  { q: "What is the main difference in the generic structure between a Recount Text and a Narrative Text?", options: ["A. Recount text has an Orientation, while Narrative text does not.", "B. Narrative text contains a Complication (conflict), while Recount text focuses on a sequence of factual events without a major conflict.", "C. Recount text uses Simple Present Tense, while Narrative uses Simple Past.", "D. Narrative text always ends with a Reorientation.", "E. Recount text is used to entertain, while Narrative is used to instruct."], ans: 1, exp: "Naratif menceritakan cerita fiksi yang memiliki konflik (Complication) dan penyelesaian (Resolution), sedangkan Recount menceritakan runtutan fakta masa lalu tanpa konflik drama." },
  { q: narrativeText + "From the text, we can conclude that the wolf was...", options: ["A. Patient and careful", "B. Smart and helpful", "C. Greedy and careless", "D. Kind and generous", "E. Brave and loyal"], ans: 2, exp: "Sifat serigala tersurat dari tindakannya yang memakan semua daging hingga perutnya membesar tanpa peduli bahaya lubang kecil (greedy and careless)." },
  { q: narrativeText + "What is the moral value of the story?", options: ["A. We must be greedy to survive in the forest.", "B. Helping friends in need is a bad idea.", "C. Greediness will only lead to trouble and downfall.", "D. You should always trust a fox.", "E. Never eat meat in the forest."], ans: 2, exp: "Pesan moral dari nasib serigala yang terjebak adalah bahwa keserakahan (greediness) akan membawa kita ke dalam masalah." },
  { q: narrativeText + "Which paragraph represents the 'Resolution' of the narrative text?", options: ["A. Paragraph 1", "B. Paragraph 2", "C. Paragraph 3", "D. Paragraph 4", "E. The first sentence"], ans: 3, exp: "Resolution adalah bagian akhir cerita naratif di mana konflik terselesaikan. Pada paragraf 4, masalah selesai dengan serigala dibiarkan terjebak untuk merenungi kesalahannya." },
  { q: narrativeText + "'Help me, Fox! I am stuck!' cried the wolf.<br/>'You should have controlled your appetite. Now you have to wait...' said the fox.<br/><br/>From the dialogue, the fox's reaction implies that he is...", options: ["A. Trying to rescue the wolf.", "B. Crying for help too.", "C. Teaching the wolf a harsh lesson about self-control.", "D. Apologizing to the wolf.", "E. Giving more meat to the wolf."], ans: 2, exp: "Dialog rubah menunjukkan bahwa ia bermaksud memberi pelajaran keras tentang pengendalian diri kepada serigala yang rakus." },
  { q: narrativeText + "If the wolf had not been greedy and only ate a little piece of meat, what would likely have happened?", options: ["A. He would have starved to death.", "B. The hunter would have killed him immediately.", "C. He would have been able to slip back out of the hole safely.", "D. The fox would have trapped him inside.", "E. The tree would have fallen down."], ans: 2, exp: "Berdasarkan logika cerita, jika serigala tidak rakus dan perutnya tidak membesar, ia pasti bisa melewati lubang kecil itu untuk keluar dengan aman." },
  { q: "Which of the following is NOT a language feature commonly found in Narrative Texts?", options: ["A. Using Simple Past Tense (e.g., walked, saw, ate)", "B. Using Time Conjunctions (e.g., once upon a time, suddenly)", "C. Using Action Verbs", "D. Using Direct Speech / Dialogue", "E. Using mainly Simple Present Tense and Passive Voice"], ans: 4, exp: "Narrative text menceritakan masa lalu sehingga menggunakan Past Tense, bukan Simple Present Tense." },
  { q: narrativeText + "'...so <b>he</b> didn't go in.' (Paragraph 2)<br/><br/>The word 'he' refers to...", options: ["A. The hunter", "B. The smart fox", "C. The greedy wolf", "D. The hollow tree", "E. The meat"], ans: 1, exp: "Kalimat sebelumnya berbunyi 'The smart fox realized it was a trap, so he didn't go in.' Jadi, subjek He merujuk pada The smart fox." },
  { q: narrativeText + "'The fox then walked away, <b>leaving</b> the greedy wolf trapped...' <br/><br/>The synonym of the word 'leaving' in this context is...", options: ["A. Abandoning", "B. Arriving", "C. Helping", "D. Greeting", "E. Finding"], ans: 0, exp: "Leaving dalam konteks ini bermakna meninggalkan atau menelantarkan. Sinonim yang paling tepat adalah Abandoning." },
  { q: "The wolf was very hungry and kept complaining. Suddenly, [...] saw a piece of meat left by a hunter.<br/><br/>The correct pronoun to fill in the blank is...", options: ["A. it", "B. they", "C. we", "D. I", "E. she"], ans: 1, exp: "Kata ganti harus merujuk pada subjek jamak (Rubah dan Serigala) yang sedang berjalan bersama-sama. Kata ganti jamak orang ketiga adalah 'They'." }
];

const essayData: Essay[] = [
  { q: "41. Read the short story below carefully.<br/><br/><i>One hot day, an ant was searching for some water. After walking around for some time, she came to a spring. To reach the spring, she had to climb up a blade of grass. While making her way up, she slipped and fell into the water. A dove up a nearby tree saw her. Seeing that the ant was in trouble, the dove quickly plucked a leaf and dropped it into the water near the struggling ant. The ant moved towards the leaf and climbed up there. Soon it carried her safely to dry ground.<br/>Just at that time, a hunter nearby was throwing out his net towards the dove, hoping to trap it. Guessing what he was about to do, the ant quickly bit him on the heel. Feeling the pain, the hunter dropped his net. The dove was quick to fly away to safety.</i><br/><br/>Based on the narrative text above, formulate the moral value of the story in your own words!", exp: "<b>Pembahasan (Key Answer):</b><br/>Jawaban harus mencerminkan prinsip karma baik atau membalas budi.<br/><i>Contoh:</i> 'The moral value of the story is that one good turn deserves another. If we do good deeds and help others who are in trouble, kindness will eventually come back to us when we need it.' (Satu kebaikan pantas dibalas kebaikan lainnya)." },
  { q: "42. As a vocational school student, you are familiar with computers. Write a short Procedure Text (consisting of a Goal and at least 3 Steps using imperative sentences) on 'How to Shut Down a Computer Properly'!", exp: "<b>Pembahasan (Key Answer):</b><br/>Teks harus memiliki struktur Goal dan Steps dengan kalimat perintah (V1) dan Connectives.<br/><i>Contoh:</i><br/><b>Goal:</b> How to Shut Down a Computer Properly<br/><b>Steps:</b><br/>1. <b>First</b>, close all the running programs and save your documents.<br/>2. <b>Next</b>, click the 'Start' button on the bottom left corner of your screen.<br/>3. <b>Then</b>, click the 'Power' icon.<br/>4. <b>Finally</b>, select 'Shut down' and wait until the CPU turns off completely." },
  { q: "43. Change the following paragraph into a correct Recount Text by changing the verbs from Simple Present Tense to Simple Past Tense!<br/><br/><i>'Today, I <b>go</b> to the factory for my industrial visit. I <b>meet</b> the supervisor and he <b>shows</b> me the production line. I <b>feel</b> very excited because I <b>learn</b> how to operate the CNC machine.'</i>", exp: "<b>Pembahasan (Key Answer):</b><br/>Siswa harus mengubah 5 kata kerja ke bentuk Verb 2 yang benar.<br/><i>Jawaban:</i> 'Yesterday, I <b>went</b> to the factory for my industrial visit. I <b>met</b> the supervisor and he <b>showed</b> me the production line. I <b>felt</b> very excited because I <b>learned</b> (or learnt) how to operate the CNC machine.'" },
  { q: "44. Read the short descriptive text below.<br/><br/><i>The multimeter, also known as a VOM (volt-ohm-milliammeter), is an essential electronic measuring instrument used by technicians. It combines several measurement functions in one unit. A typical multimeter can measure voltage, current, and resistance. It has a digital display screen to show the numbers clearly, a rotary dial to select the function, and two test probes (red and black) to connect to the electrical circuit.</i><br/><br/>a. What is the Main Idea of the text?<br/>b. Based on the text, what are the three functions that a multimeter can measure?", exp: "<b>Pembahasan (Key Answer):</b><br/>a. The main idea is the description and functions of a multimeter as an essential electronic measuring instrument.<br/>b. The three functions a multimeter can measure are <b>voltage, current, and resistance</b>." },
  { q: "45. Both Narrative Text and Recount Text start with a generic structure called 'Orientation'. Explain the difference between the 'Orientation' in a Narrative Text and the 'Orientation' in a Recount Text!", exp: "<b>Pembahasan (Key Answer):</b><br/>The 'Orientation' in a <b>Narrative Text</b> is used to introduce the setting and the characters of a <i>fictional or imaginary</i> story (e.g., 'Once upon a time...').<br/>On the other hand, the 'Orientation' in a <b>Recount Text</b> is used to introduce the factual background information of a <i>real past event</i>, telling the reader who was involved, what happened, where, and when it happened (e.g., 'Last week, my class went to Jakarta')." }
];

export default function SimulasiBahasaInggrisPage() {
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
    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-violet-600">
      <div className="text-6xl mb-6 flex justify-center gap-4">
        <span>🇬🇧</span><span>📚</span><span>🎓</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">English Tryout Test</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Sharpen your reading comprehension, grammar, and vocabulary skills. Includes 40 Multiple Choice Questions and 5 Essay Reviews based on the PSAJ Curriculum.
      </p>
      <button 
        onClick={handleStart}
        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-violet-600/40 text-lg uppercase tracking-wide"
      >
        Start The Test
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full mx-auto animate-fade-in-up border-t-4 border-violet-600">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-violet-600 uppercase tracking-wider">
            Question {currentIndex + 1} of {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-violet-600 to-fuchsia-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
          <div 
            className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center ";
            
            if (!hasAnswered) {
              btnClass += "border-slate-200 bg-white hover:border-violet-400 hover:bg-violet-50 text-slate-700 cursor-pointer hover:translate-x-1 hover:shadow-md";
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
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mr-4 font-bold text-sm ${!hasAnswered ? 'bg-slate-100 text-slate-600' : isCorrect ? 'bg-emerald-200 text-emerald-800' : isSelected ? 'bg-rose-200 text-rose-800' : 'bg-slate-100 text-slate-400'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-md md:text-lg" dangerouslySetInnerHTML={{ __html: opt.substring(3).replace(/\\n/g, '<br/>') }} />
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {hasAnswered && (
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-inner border-l-4 ${selectedOption === currentQuestion.ans ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
            <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-emerald-700' : 'text-rose-700'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Correct Answer!' : '❌ Incorrect Answer!'}
            </h4>
            <div className="text-slate-700 leading-loose text-md bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
              <strong className="text-violet-600">Explanation: </strong> 
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
              className={`font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:translate-x-1 ${currentIndex === mcqData.length - 1 ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/40' : 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Finish & Check Score 🏁' : 'Next &rarr;'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full mx-auto animate-fade-in-up border-t-8 border-violet-600">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Essay Writing & Review</h2>
        <p className="text-slate-500">Master the key concepts below to ace your written test.</p>
      </div>
      
      <div className="flex flex-col gap-8">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div 
              className="font-bold text-violet-800 mb-4 text-lg border-b-2 border-violet-100 pb-3"
              dangerouslySetInnerHTML={{ __html: item.q }}
            />
            <div 
              className="text-slate-700 leading-loose bg-white p-5 rounded-xl border border-slate-100 shadow-inner"
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
          &#8634; Retake The Test
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100 via-slate-100 to-fuchsia-50">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4 text-violet-500">🏆</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Completed!</h2>
            <p className="text-slate-500 mb-8">Your final score is:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" 
                 style={{ background: `conic-gradient(#7c3aed ${finalScore}%, #e2e8f0 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg">
                <span className="text-6xl font-black text-violet-600 drop-shadow-sm">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4 leading-relaxed">
              {finalScore >= 85 ? "Excellent! Your English proficiency is outstanding. 🌟" : finalScore >= 70 ? "Good Job! Keep practicing your grammar and vocabulary. 👍" : "Don't Give Up! Review the explanations to improve your skills. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-violet-500/40 hover:-translate-y-1 tracking-wide uppercase"
            >
              Review The Essays &rarr;
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
