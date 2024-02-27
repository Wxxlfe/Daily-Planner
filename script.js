class Scheduler {
  constructor() {
    this.timeBlocks = Array.from(document.querySelectorAll('.time-block'));
    this.saveButtons = Array.from(document.querySelectorAll('.saveBtn'));
    this.clearButton = document.querySelector('.clearBtn');
    this.currentDayElement = document.querySelector('#currentDay');
    this.init();
  }

  init() {
    this.displayTime();
    this.updateTimeBlockClasses();
    this.loadData();
    this.addEventListeners();
  }

  displayTime() {
    const now = new Date();
    const formattedTime = `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()} at ${now.toLocaleTimeString()}`;
    this.currentDayElement.textContent = formattedTime;
  }

  saveDescription(event) {
    const timeBlock = event.target.parentElement;
    const textArea = timeBlock.querySelector('textarea');
    localStorage.setItem(timeBlock.id, textArea.value);
  }

  updateTimeBlockClasses() {
    const currentHour = new Date().getHours();
    this.timeBlocks.forEach(block => {
      const blockHour = Number(block.id.split('-')[1]);
      block.classList.add(blockHour < currentHour ? 'past' : blockHour === currentHour ? 'present' : 'future');
    });
  }

  loadData() {
    this.timeBlocks.forEach(block => {
      const description = block.querySelector('.description');
      description.value = localStorage.getItem(block.id) || '';
    });
  }

  clearData() {
    localStorage.clear();
    this.timeBlocks.forEach(block => {
      const description = block.querySelector('.description');
      description.value = '';
    });
  }

  addEventListeners() {
    this.saveButtons.forEach(button => button.addEventListener('click', this.saveDescription.bind(this)));
    this.clearButton.addEventListener('click', this.clearData.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => new Scheduler())
