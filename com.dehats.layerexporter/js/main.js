/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    // Opens the chrome developer tools in host app
    function showDevTools() {
        window.__adobe_cep__.showDevTools();
    }
    
    // Reloads extension panel
    function reloadPanel() {
        location.reload();
    }
    
    // Loads / executes a jsx file
    function loadJSXFile(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        csInterface.evalScript('$._ext.evalFile("' + scriptPath + '")');
    }
    
    // Loads / executes all jsx files in the given folder
    function loadJSXFiles(pFolderPath) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + pFolderPath;
        csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
    }
    
    
    
    function init() {
                
        themeManager.init();
        
        loadJSXFile("/jsx/export-layers-panelscript.jsxbin");
        
        $("#btn_debug").click(showDevTools);
        $("#btn_reload").click(reloadPanel);
        
        $("#btn_exec").click(function () {
            var val = $('input:radio[name=group1]:checked').val();
            var code = '$._ext.exportLayers(' + val + ');';
            console.log(code);
            csInterface.evalScript(code, function (result) {
                console.log("returned:" + result);
            });
        });
    }
        
    init();

}());
    
