<!-- 💬 Universal Comment Section HTML -->
    <div class="max-w-4xl mx-auto px-4 py-10 w-full relative z-10">
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100">
            
            <h2 class="text-2xl font-black mb-6 text-slate-800 flex items-center gap-3">
                <i class="fa-regular fa-comments text-pink-500"></i>
                Apnar Motamot
            </h2>
            
            <!-- Comment Input Form -->
            <div class="mb-8 flex flex-col gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <input type="text" id="comment-name" placeholder="Apnar Nam (Optional)" class="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all w-full md:w-1/3 text-slate-700 font-medium text-sm">
                
                <div class="flex flex-col md:flex-row gap-3">
                    <textarea id="comment-text" rows="2" placeholder="Ekhane apnar motamot ba proshno likhun..." class="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all flex-grow text-slate-700 text-sm resize-none"></textarea>
                    
                    <button id="submit-comment" class="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-pink-500/30 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2">
                        <i class="fa-regular fa-paper-plane"></i> Pathan
                    </button>
                </div>
            </div>

            <!-- List of Comments (Dynamic Load) -->
            <div id="comments-list" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <p class="text-slate-400 italic text-sm text-center py-8"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Comments asche...</p>
            </div>
            
        </div>
    </div>

    <!-- 🔥 Comments Script Import 🔥 -->
    <script type="module" src="comments.js"></script>

### 🛠️ Eita kivabe kaaj korbe?
1. Keu jokhon nam ar comment likhe **"Pathan"** button-e click korbe, ta sathe sathei apnar Firebase database-e joma hobe.
2. `comments.js` file-ti automatic page-er nam pore nibe (jemon `converter.html` ke se `converter` dhore nibe). Fole ek page-er comment onno page-e uki dibe na!
3. Comment-ti ekdom live dekha jabe. Keu onno phone theke comment korle, apnar phone-e page refresh na korei instant bheshe uthbe (jeta ekdom professional apps-er moto feel dibe).

Bhai, ekbar `converter.html`-e ei box-ti boshiye check korun, pochondo hole baki page guloteo just HTML tuk paste kore diben! Kono oshubidha hole amake janaben.