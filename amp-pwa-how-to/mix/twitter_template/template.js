// document.addEventListener("load",  evt => {
//     // a要素のhrefを指定する
//     const a = root.querySelector('.twitter-link');
//     const idSlot = root.querySelector('.twitter-id');
//     const id = idSlot.assignedNodes()[0];
//     a.href = `https://twitter.com/${id.textContent}`;
// })

(() => {
    const a = root.querySelector('.twitter-link');
    const idSlot = root.querySelector('.twitter-id');
    const id = idSlot.assignedNodes()[0];
    a.href = `https://twitter.com/${id.textContent}`;
})();

