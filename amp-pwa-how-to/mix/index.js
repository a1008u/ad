(()=>{
    // template取得用かつtemplateを取得して、containerに格納
    const template = document
        .querySelector('link[rel="import"]')
        .import
        .querySelector('template');
    document.querySelector('#container').appendChild(template);

    // Shadow Rootを作成する
    const host = document.querySelector('.twitter-card');
    const root = host.attachShadow({mode: 'open'});

    // テンプレートからカードを作成する
    const template2 = document.querySelector('#twitter-card-template');
    const card = document.importNode(template2.content, true);

    // カードをShadow Rootへ追加する
    root.appendChild(card);
})();
