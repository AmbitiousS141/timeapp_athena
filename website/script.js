document.addEventListener('DOMContentLoaded', () => { 
    const buttons = document.querySelectorAll('.tab-button'); 
    const texts = document.querySelectorAll('.tab-words'); 
    
    buttons.forEach(btn => { 
        btn.addEventListener('click', () => { 
            buttons.forEach(b => 
                b.classList.remove('active')); 

                btn.classList.add('active'); 
                
                const tab = btn.dataset.tab; 
                texts.forEach(t => { 
                    t.style.display = (t.dataset.tab === tab) ? 'block' : 'none'; 
                }); 
            }); 
        }); 
    });