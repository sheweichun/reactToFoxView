


export default function(){
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const doc = document.all ? iframe.contentWindow.document : iframe.contentDocument;
    doc.open();
    doc.write(`
       <script>
        const win = window.top;
        (function(React,ReactDOM,container){
                ReactDOM.render(React.createElement('div',{},'React In Iframe'),container)   
        }(win.React,win.ReactDOM,win.document.getElementById('iframe')))
       </script>
    `);
    doc.close();
    
    // iframe.contentEditable = true;
    // ed.designMode = 'on';

}