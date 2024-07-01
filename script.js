document.addEventListener('DOMContentLoaded', () => {
    const seatContainer = document.getElementById('seatContainer');
    const dateContainer = document.getElementById('dateContainer');
    const timeContainer = document.getElementById('timeContainer');
    const ticketCount = document.getElementById('ticketCount');
    const ticketTotal = document.getElementById('ticketTotal');
    const convenienceFee = document.getElementById('convenienceFee');
    const totalAmount = document.getElementById('totalAmount');
    const bookBtn = document.getElementById('bookBtn');
    const movieSelect = document.getElementById('movieSelect');
    const modal = document.getElementById('bookingModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementsByClassName('close')[0];

    let selectedSeats = 0;
    let ticketPrice = parseInt(movieSelect.value);

    // Generate seats
    for (let i = 0; i < 80; i++) {
        const isBooked = Math.random() < 0.3;
        const seatInput = document.createElement('input');
        seatInput.type = 'checkbox';
        seatInput.id = `seat${i}`;
        seatInput.style.display = 'none';

        const seatLabel = document.createElement('label');
        seatLabel.htmlFor = `seat${i}`;
        seatLabel.className = `seat${isBooked ? ' booked' : ''}`;
        seatLabel.textContent = String.fromCharCode(65 + Math.floor(i / 10)) + (i % 10 + 1);

        if (!isBooked) {
            seatInput.addEventListener('change', updateTotal);
        }

        seatContainer.appendChild(seatInput);
        seatContainer.appendChild(seatLabel);
    }

    // Generate dates
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dateInput = document.createElement('input');
        dateInput.type = 'radio';
        dateInput.name = 'date';
        dateInput.id = `date${i}`;
        dateInput.style.display = 'none';

        const dateLabel = document.createElement('label');
        dateLabel.htmlFor = `date${i}`;
        dateLabel.className = 'date-item';
        dateLabel.innerHTML = `
            <div>${days[date.getDay()]}</div>
            <div>${date.getDate()}</div>
        `;

        dateContainer.appendChild(dateInput);
        dateContainer.appendChild(dateLabel);
    }

    // Generate times
    const times = ['11:00', '14:30', '18:00', '21:30'];
    times.forEach((time, index) => {
        const timeInput = document.createElement('input');
        timeInput.type = 'radio';
        timeInput.name = 'time';
        timeInput.id = `time${index}`;
        timeInput.style.display = 'none';

        const timeLabel = document.createElement('label');
        timeLabel.htmlFor = `time${index}`;
        timeLabel.className = 'time-item';
        timeLabel.textContent = time;

        timeContainer.appendChild(timeInput);
        timeContainer.appendChild(timeLabel);
    });

    function updateTotal() {
        selectedSeats = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const ticketCost = selectedSeats * ticketPrice;
        const fee = Math.round(ticketCost * 0.1 * 100) / 100; // 10% convenience fee
        const total = ticketCost + fee;

        ticketCount.textContent = selectedSeats;
        ticketTotal.textContent = ticketCost.toFixed(2);
        convenienceFee.textContent = fee.toFixed(2);
        totalAmount.textContent = total.toFixed(2);
    }

    movieSelect.addEventListener('change', function() {
        ticketPrice = parseInt(this.value);
        updateTotal();
    });

    bookBtn.addEventListener('click', () => {
        if (selectedSeats > 0) {
            const selectedMovie = movieSelect.options[movieSelect.selectedIndex].text;
            const selectedDate = document.querySelector('input[name="date"]:checked + label');
            const selectedTime = document.querySelector('input[name="time"]:checked + label');
            
            if (!selectedDate || !selectedTime) {
                alert('Please select a date and time for your booking.');
                return;
            }

            const dateText = `${selectedDate.querySelector('div:first-child').textContent}, ${selectedDate.querySelector('div:last-child').textContent}`;
            const timeText = selectedTime.textContent;

            modalContent.innerHTML = `
                <p><strong>Movie:</strong> ${selectedMovie}</p>
                <p><strong>Date:</strong> ${dateText}</p>
                <p><strong>Time:</strong> ${timeText}</p>
                <p><strong>Seats:</strong> ${selectedSeats}</p>
                <p><strong>Total Cost:</strong> $${totalAmount.textContent}</p>
                <p>Thank you for your booking!</p>
            `;
            modal.style.display = "block";
        } else {
            alert('Please select at least one seat.');
        }
    });

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Initialize
    updateTotal();
    document.querySelector('input[name="date"]').checked = true;
    document.querySelector('input[name="time"]').checked = true;
});