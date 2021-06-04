const game = new Chess();


const onDrop = (source, target) => {
    //駒の状態監視
    const move = game.move({
        from: source,  // 移動元の位置
        to: target,     // 移動後の位置
        promotion: 'q' //プロモーションの設定（p→q）
    })

    // 駒の移動に問題があれば元の位置に戻す
    if (move === null) return 'snapback';

    //相手の動き
    window.setTimeout(makeCPUmove, 250);
    //ゲーム終了
    if (game.game_over()) {
        alert('Checkmate');
        // チェスボードを元に戻す
        // game.reset();
    }
}

// CPUプレイヤーの移動処理
const makeCPUmove = () => {
    if (!game.game_over()) {
        const cpuMove = game.moves();
        // 駒が動かせる場所をランダムに1つ選ぶ
        const randomNum = Math.floor(Math.random() * cpuMove.length);
        // 選択した場所へ駒を動かす
        game.move(cpuMove[randomNum]);

        console.log(game.pgn())
        // チェスボードの描画を更新する
        board.position(game.fen());
    }
}

const config = {
    // チェスの駒を初期位置にする
    position: 'start',
    // マウスで駒を動かせるようにする
    draggable: true,
    // 駒が移動した後にonDrop関数を実行する
    onDrop: onDrop
};

// divタグ「board」を指定して「config」を設定する
const board = ChessBoard('board', config);