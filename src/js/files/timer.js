export default function timer() {
  const timers = document.querySelectorAll(".product-card__time");

  if (timers.length) {
    timers.forEach((timer) => {
      const dataDate = timer.dataset.date;
      console.log(dataDate)
      const endTime = new Date(dataDate);
      let interval;

      function updateTimer() {
        const timeLeft = countdown(endTime);

        // Отображаем оставшееся время
        timer.innerHTML = `${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`;

        // Если таймер истек, останавливаем обновление
        if (endTime - new Date() <= 0) {
          timer.innerHTML = "Время вышло!";
          clearInterval(interval);
        }
      }

      // Запускаем таймер каждую секунду
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    });
  }
}
