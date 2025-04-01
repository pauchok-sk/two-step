export default function timer() {
  const timer = document.querySelector("#timer");

  if (timer) {
    const dataDate = timer.dataset.date;
    const endTime = new Date(dataDate);
    let interval;
    
    function updateTimer() {
      const timeLeft = countdown(endTime);

      // Отображаем оставшееся время
      timer.innerHTML = `${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`;

      // Если таймер истек, останавливаем обновление
      if (endTime - new Date() <= 0) {
        document.getElementById("timer").innerHTML = "Время вышло!";
        clearInterval(interval);
      }
    }

    // Запускаем таймер каждую секунду
    updateTimer();
    interval = setInterval(updateTimer, 1000);
  }
}
