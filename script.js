async function triggerOneSignalPush(receiverMobile, messageText) { 
    try { 
        // যাকে পাঠাবেন, ডাটাবেস থেকে তার তথ্য আনা
        const receiverRef = doc(db, 'artifacts', SYNC_APP_ID, 'public', 'data', 'chat_users', receiverMobile); 
        const receiverSnap = await getDoc(receiverRef); 
        
        if (receiverSnap.exists()) { 
            const rData = receiverSnap.data(); 
            // যদি তার OneSignal ID থাকে, তবেই নোটিফিকেশন পাঠাবে
            if (rData.onesignal_id) { 
                const restApiKey = "os_v2_app_kivtcnwbnvg6xbbdotnmhvsffzag6wdfng7ufmfb7dtdwn2k4nr43uy5xgi6zvzqfyttgujh3yhn4eghuttyixea2o7dopgljwgq3uq"; 
                
                fetch("https://onesignal.com/api/v1/notifications", { 
                    method: "POST", 
                    headers: { 
                        "Content-Type": "application/json; charset=utf-8", 
                        "Authorization": "Basic " + restApiKey 
                    }, 
                    body: JSON.stringify({ 
                        app_id: "522b3136-c16d-4deb-8423-74dac3d6452e", 
                        include_player_ids: [rData.onesignal_id], 
                        contents: {"en": messageText}, 
                        headings: {"en": myName + " থেকে মেসেজ"}, // কে পাঠিয়েছে তার নাম দেখাবে
                        priority: 10 
                    }) 
                }).catch(e => console.log("Push Error:", e)); 
            } 
        } 
    } catch (error) {} 
}
