//Settings under refnav.
// cache_strongs.addEventListener('change', function () {
//     if (this.checked) {
//         localStorage.removeItem('transliteratedWords')
//     }
// });
// cache_higlights.addEventListener('change', function () {
//     if (this.checked) {
//         localStorage.removeItem('strongsHighlightStyleSheet')
//     }
// });
let defaultReference; //For browser history
versionsToShow = ['KJV'];

function cacheFunctions() {
    versionsToShow2 = versionsToShow;
    if (localStorage.getItem('versionsToShow')) {
        let versionsToDisplay = localStorage.getItem('versionsToShow').split(',');
        versionsToShow = versionsToDisplay;
        versionsToShow2 = versionsToShow;
    }
    /* LOAD SAVED BIBLE VERSEIONS */
    if (localStorage.getItem('loadedBibleVersions')) {
        let versionsToBeLoaded = localStorage.getItem('loadedBibleVersions').split(',');
        versionsToBeLoaded.forEach(version => {
            versionID = version + '_version';
            //To indicate the book has been loaded
            document.querySelector('#' + versionID).checked = true;
            loadVersion(version); //To load the book
        });
    }
    /* Load the KJV as default translation if no previously selected version */
    else {
        //To indicate the book has been loaded
        document.querySelector('#KJV_version').checked = true;
        //To load the book
        loadVersion('KJV');
    }
    if (localStorage.getItem('strongsHighlightStyleSheet')) {
        let hlstrngCSS = localStorage.getItem('strongsHighlightStyleSheet');
        let headPart = document.getElementsByTagName('head')[0];
        newStyleInHead = document.createElement('style');
        newStyleInHead.id = 'highlightstrongs';
        newStyleInHead.innerHTML = hlstrngCSS.split(',').join('');
        headPart.append(newStyleInHead);
        // hlstrngCSS = hlstrngCSS.split(',').join('');
    }
    if (localStorage.getItem('showVersesInSearch')) {
        let showVerseCheck = localStorage.getItem('showVersesInSearch');
        if (showVerseCheck == 'yes') {
            showreturnedverses.check = true
        } else if (showVerseCheck == 'no') {
            showreturnedverses.checked = false
        }
    }

    if (localStorage.getItem('currentFontSizeSet')&&localStorage.getItem(localStorage.getItem('currentFontSizeSet'))) {
        const stylesVariablesArray = localStorage.getItem(localStorage.getItem('currentFontSizeSet')).split(',');
        stylesVariablesArray.forEach((sVar, i) => {
            j = i + 2;
            if (j % 2 == 0) {
                document.querySelector(':root').style.setProperty(stylesVariablesArray[i], stylesVariablesArray[i + 1]);
            }
        });
        fontsizes.value = localStorage.getItem('currentFontSizeSet');
    }
    if (kso=localStorage.getItem('keepsearchopen')) {
        keepsearchopen.checked=kso;
    }
    if (localStorage.getItem('eng2grk_sup_checkboxes')) {
        const eng2grk_sup_checkboxes = localStorage.getItem('eng2grk_sup_checkboxes').split(',');
        eng2grk_sup_checkboxes.forEach((x,i)=>{
            if((i==0)||(i%2==0)){
                let currentChkbx = document.querySelector('#'+x);
                if((eng2grk_sup_checkboxes[i+1]=='true')){
                    parentBtn=elmAhasElmOfClassBasAncestor(currentChkbx, 'button');
                    parentBtn.classList.add('active_button');
                    if(parentBtn==show_eng_superscript){engnXlit_supscript('eng')}
                    else if(parentBtn==show_hebgrk_superscript){engnXlit_supscript('hebgrk')}
                    else if(parentBtn==center_settings_h){centerNavigationAndOtherSettings('h')}
                    else if(parentBtn==center_settings_v){centerNavigationAndOtherSettings('v')}
                    else if(currentChkbx==show_versenote_totheright_check){
                        show_versenote_totheright_check.checked=true;
                        show_versenote_totheright_2_check.checked=true
                    }
                    else {currentChkbx.checked=true;}
                    // parentBtn.click()
                }
                else {
                    currentChkbx.checked=false;
                    parentBtn=elmAhasElmOfClassBasAncestor(currentChkbx, 'button');
                    parentBtn.classList.remove('active_button');
                    // parentBtn.click()
                }
            }
        })    
    } else if(isMobileDevice){
        center_settings_v_check.checked=true;
        centerNavigationAndOtherSettings('v')
    }
    // For Darkmode
    if (localStorage.getItem('darkmode')) {darkLightMode()}
}

function cacheFunctions2() {
    runCacheFunc2 = false;
    versionsToShow.forEach(versionName => {
        document.querySelector('[bversion="' + versionName + '"]').click();
    })
    if (localStorage.getItem('lastBookandChapter')) {
        lastOpenedBook = localStorage.getItem('lastBookandChapter').split(',')[0];
        lastOpenedChapter = localStorage.getItem('lastBookandChapter').split(',')[1];
    }
    /* Default chapter Gen 1 */
    else {
        lastOpenedBook = 'book_1';
        lastOpenedChapter = 'bk1ch1';
    }
    document.querySelector('.bkname[value="' + lastOpenedBook + '"]').click()
    getTextOfChapter(bible_chapters.querySelector('.chptnum[value="' + lastOpenedChapter + '"]'));
    defaultReference = lastOpenedBook + ' ' + lastOpenedChapter;
    if (localStorage.getItem('transliteratedWords')) {
        transliteratedWords_Array = localStorage.getItem('transliteratedWords').split(',');
        transliteratedWords_Array.forEach(storedStrnum => {
            if(/G|H\d+/i.test(storedStrnum)){
                showTransliteration(storedStrnum)
            }
        });
    }
}

function setItemInLocalStorage(name, nValue) {
    let cache_strongs=document.querySelector('#cache_strongs');
    let cache_higlights=document.querySelector('#cache_higlights');
    if (name == 'transliteratedWords' && (!cache_strongs||!cache_strongs.checked)) { //check if in the settings saving to cache for the transliteration words is selected
        localStorage.setItem(name, nValue);
    } else if (name == 'strongsHighlightStyleSheet' && (!cache_higlights||!cache_higlights.checked)) {
        localStorage.setItem(name, nValue);
    } else {
        localStorage.setItem(name, nValue);
    }
}

// function removeFromLocalStorage() {}