

var MyScore = {
      score: 10,
      lineWidth: 10,
      offsetX: 10,
      offsetY: 10,
      color: 'rgb(200,200,80)',

      


}

function setScoreOffset() {

}

function drawScore() {

      // context.save();
      // context.translate(-score.offsetX, - score.offsetY);

      context.lineWidth = MyScore.lineWidth;
      context.fillStyle = MyScore.color;

      context.font = 'normal bold 18 em "new century schoolbook"';

      context.fillText(MyScore.score, MyScore.offsetX, MyScore.offsetY);

      // context.strokeRect(score.left, score.top, score.width, score.height);
      // context.fillRect(score.left, score.top, score.width, score.height);
      // context.restore();


}