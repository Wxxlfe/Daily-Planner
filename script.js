// Function to display current time
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] h:mm:ss a');
  $('#currentDay').text(rightNow);
}

// Function to save text in local storage
function saveDescription() {
  var textDescription = $(this).siblings('textarea').val();
  var timeKey = $(this).closest('.time-block').attr('id');
  localStorage.setItem(timeKey, textDescription);
}

// Function to update time block classes based on current time
function updateClasses() {
  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
      var hourID = parseInt($(this).attr('id').split("-")[1]);
      $(this).toggleClass('past', hourID < currentHour);
      $(this).toggleClass('present', hourID === currentHour);
      $(this).toggleClass('future', hourID > currentHour);
  });
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
  $('.time-block').each(function() {
      var hourID = $(this).attr('id');
      $(this).find('.description').val(localStorage.getItem(hourID));
  });
}

// Function to clear local storage
function clearLocalStorage() {
  localStorage.clear();
  $('.description').val('');
}

// Event listeners
$(document).ready(function() {
  displayTime();
  $('.saveBtn').on('click', saveDescription);
  updateClasses();
  loadDataFromLocalStorage();
  $('.clearBtn').on('click', clearLocalStorage);
});
