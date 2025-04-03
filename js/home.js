// tradutor
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({ 
                pageLanguage: 'pt', 
                includedLanguages: 'en,pt', 
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE 
            }, 'google_translate_element');
        }

        function traduzirParaIngles() {
            var iframe = document.querySelector("badeira");
            if (!iframe) {
                console.error("Google Translate iframe não encontrado.");
                return;
            }

            var select = iframe.contentWindow.document.querySelector(".bandeira");
            if (select) {
                select.value = "en";
                select.dispatchEvent(new Event("change"));
            } else {
                console.error("Dropdown de idiomas não encontrado.");
            }
        }
        googleTranslateElementInit()