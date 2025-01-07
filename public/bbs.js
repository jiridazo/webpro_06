"use strict";

let number=0;  // とうこうけんすう
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const time = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message+'&time='+time,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});



document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        console.log( response );
        if( number != value ) {　　// サーバーからデータを再取得
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            console.log( params );
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    console.log( response );
                    let cover = document.createElement('div');　//一軒分の投稿
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    let date_area = document.createElement('span');
                    date_area.className = 'date';
                    date_area.innerText = mes.time;

                    let like_button = document.createElement('button');
                    like_button.className = 'like';
                    like_button.innerText = `いいね (${mes.like})`;
                    like_button.addEventListener('click', () => {
                    const id = mes.id;
                    const post_message = mes_area.innerText;
                    const current_like = mes.like;
                        // クライアントから送るいいね数（現在の値 + 1）
                        const update_like = current_like + 1;

                        const params = {
                            method: "POST",
                            body: 'id=' + id + '&message=' + post_message + '&like=' + update_like,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        console.log( params );
                        const url = "/like";
                        fetch(url, params)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Error');
                            }
                            return response.json();
                        })
                        .then((response) => {
                            console.log( response );
                            mes.like = response.like;  // サーバーから返ってきた新しいいいね数
                            like_button.innerText = `いいね (${mes.like})`;  // ボタンの表示を更新
                            console.log("いいねされたメッセージ:", cover);
                        });
                    });

                    let delete_button = document.createElement('button');
                    delete_button.className = 'delete';
                    delete_button.innerText = '削除';
                    delete_button.addEventListener('click', () => {
                        const post_message = mes_area.innerText;
                        const id = mes.id;
                        const params = {
                            method: "POST",
                            body: 'id='+id+'&message='+post_message,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        console.log(params);
                        const url = "/delete";
                        fetch(url, params)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Error');
                                }
                                return response.json();
                            })
                            .then((response) => {
                                number = response.number
                                console.log( response );
                                console.log("削除されたメッセージ:", cover);
                                    bbs.removeChild(cover);  // 削除したメッセージを画面から削除
                            });

                    });
                    
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    cover.appendChild(date_area);
                    cover.appendChild(delete_button);
                    cover.appendChild(like_button);
                    bbs.appendChild( cover );
                }
            })
        }
    });
});



