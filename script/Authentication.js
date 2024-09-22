// Constants and DOM element references
const scriptURL = 'https://script.google.com/macros/s/AKfycby4do0LLbf_usL-ShmbGLjSi0jSp5QYhyV-gsCtOs2anfglZ2Lfegu7a-v4PxK7ORdGyQ/exec';
const registrationForm = document.getElementById('details-form').querySelector('form');
const accessForm = document.getElementById('access-form').querySelector('form');
const detailsFormDiv = document.getElementById('details-form');
const accessFormDiv = document.getElementById('access-form');
const loadingOverlay = document.getElementById('loading');
const successOverlay = document.getElementById('success');
const userNameSpan = document.getElementById('userName');
const loadingSpinner = document.getElementById('loadingSpinner');
const submitButton = accessForm.querySelector('#submitButton');
const buttonText = submitButton.querySelector('#buttonText');
const buttonArrow = submitButton.querySelector('#buttonArrow');

// Utility functions
function typeEffectOnH2(element, text, speed) {
    let index = 0;
    element.textContent = "";
    element.classList.add('typing-cursor');

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
        }
    }

    type();
}

function generateAccessKey() {
    return CryptoJS.lib.WordArray.random(4).toString(CryptoJS.enc.Hex).slice(0, 7).toUpperCase();
}

function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

function getCurrentDate() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
}

function typeEffect(element, text, speed) {
    let index = 0;
    element.value = "";

    function type() {
        if (index < text.length) {
            element.value += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// async function generateStableIdentifier() {
//     const { device } = getBrowserAndDevice();
//     const deviceCharacteristics = [
//         device,
//         screen.width,
//         screen.height,
//         screen.colorDepth,
//         navigator.hardwareConcurrency,
//         navigator.deviceMemory,
//         navigator.platform,
//         new Date().getTimezoneOffset(),
//         Intl.DateTimeFormat().resolvedOptions().timeZone
//     ];

//     const canvas = document.createElement('canvas');
//     const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
//     let glInfo = 'No WebGL';
//     if (gl) {
//         const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
//         glInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
//     }
//     deviceCharacteristics.push(glInfo);

//     const deviceString = deviceCharacteristics.join('|');
//     const encoder = new TextEncoder();
//     const data = encoder.encode(deviceString);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);

//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
//     const shortId = hashBase64.substr(0, 7).replace(/\+/g, '0').replace(/\//g, '1');

//     let ipAddress;
//     try {
//         const response = await fetch('https://api.ipify.org?format=json');
//         if (!response.ok) throw new Error('IP fetch failed');
//         const data = await response.json();
//         ipAddress = data.ip;
//     } catch (error) {
//         console.error('Error fetching IP address:', error);
//         ipAddress = 'unknown';
//     }

//     return { stableId: shortId, ipAddress: ipAddress };
// }


async function generateStableIdentifier() {
    // Retrieve from localStorage if already generated
    let storedStableId = localStorage.getItem('stableId');
    if (storedStableId) {
        return { stableId: storedStableId, ipAddress: await getIpAddress() };
    }

    const { device, browser } = getBrowserAndDevice();
    const deviceCharacteristics = [
        device,  // Device type (Android, iOS, Windows, etc.)
        navigator.platform.toLowerCase(),  // Normalize platform
        screen.width,  // Screen width
        screen.height, // Screen height
        new Date().getTimezoneOffset(),  // Timezone offset
        Intl.DateTimeFormat().resolvedOptions().timeZone  // Timezone name
    ];

    // Only use WebGL characteristics if they are available (some browsers restrict this)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const glInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            deviceCharacteristics.push(glInfo.toLowerCase());  // Normalize WebGL info
        }
    }

    // Combine all characteristics and normalize to lowercase to avoid case differences
    const deviceString = deviceCharacteristics.join('|').toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(deviceString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a string and take the first 7 characters
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
    const shortId = hashBase64.substr(0, 7).replace(/\+/g, '0').replace(/\//g, '1');

    // Get the user's IP address
    const ipAddress = await getIpAddress();

    // Store the generated stableId in localStorage for future sessions
    localStorage.setItem('stableId', shortId);

    return { stableId: shortId, ipAddress: ipAddress };
}

async function getIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('IP fetch failed');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'unknown';
    }
}

function getBrowserAndDevice() {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let device = 'Unknown';

    if (/brave/i.test(navigator.brave)) browser = 'Brave';
    else if (/Edg\/|Edge\//.test(userAgent)) browser = 'Edge';
    else if (/OPR\/|Opera\//.test(userAgent)) browser = 'Opera';
    else if (/Firefox\//.test(userAgent)) browser = 'Firefox';
    else if (/Chrome\//.test(userAgent)) browser = 'Chrome';
    else if (/Safari\//.test(userAgent)) browser = 'Safari';
    else if (/Trident\/|MSIE/.test(userAgent)) browser = 'Internet Explorer';
    else if (/UCBrowser\//.test(userAgent)) browser = 'UC Browser';
    else if (/SamsungBrowser\//.test(userAgent)) browser = 'Samsung Internet';

    if (/android/i.test(userAgent)) device = 'Android';
    else if (/iPad|iPhone|iPod/.test(userAgent)) device = 'iOS';
    else if (/Windows NT/.test(userAgent)) device = 'Windows';
    else if (/Mac OS X/.test(userAgent)) device = 'Mac OS';
    else if (/Linux/.test(userAgent)) device = 'Linux';

    return { browser, device };
}

function validateForm() {
    const nameInput = registrationForm.querySelector('input[name="Name"]');
    const emailInput = registrationForm.querySelector('input[name="Email"]');
    const branchSelect = registrationForm.querySelector('select[name="Branch"]');
    const yearSelect = registrationForm.querySelector('select[name="Year"]');

    if (nameInput.value.length < 2) {
        alert("Please Enter Proper Name");
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
        alert("Please enter a valid email");
        return false;
    }

    if (branchSelect.value === "Your Branch" || yearSelect.value === "Your Year") {
        alert("Please select your Branch and Year before submitting.");
        return false;
    }

    return true;
}

function showAccessForm(accessKey, userName) {
    detailsFormDiv.style.display = 'none';
    accessFormDiv.style.display = 'flex';

    setTimeout(() => {
        const accessKeyInput = document.getElementById('accessKey');
        typeEffect(accessKeyInput, accessKey, 150);
    }, 600);

    userNameSpan.textContent = userName;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const h2Element = document.getElementById('register-title');
    setTimeout(() => {
        typeEffectOnH2(h2Element, "Register Once, Access Anytime", 130);
    }, 500);

    document.addEventListener('contextmenu', event => event.preventDefault());
});

registrationForm.addEventListener('submit', async e => {
    e.preventDefault();
    loadingOverlay.style.display = 'flex';

    if (!validateForm()) {
        loadingOverlay.style.display = 'none';
        return;
    }

    try {
        const { stableId, ipAddress } = await generateStableIdentifier();
        const { browser, device } = getBrowserAndDevice();

        const formData = new FormData(registrationForm);
        const accessKey = generateAccessKey();

        const additionalData = {
            StableIdentifier: stableId,
            IPAddress: ipAddress,
            Browser: browser,
            Device: device,
            accessKey: accessKey,
            Time: getCurrentTime(),
            Date: getCurrentDate()
        };

        Object.entries(additionalData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await fetch(scriptURL, { method: 'POST', body: formData });

        if (response.ok) {
            localStorage.setItem('accessKey', accessKey);
            showAccessForm(accessKey, formData.get('Name'));
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error!', error.message);
        alert('An error occurred. Please try again.');
    } finally {
        loadingOverlay.style.display = 'none';
    }
});

accessForm.addEventListener('submit', e => {
    e.preventDefault();
    buttonText.textContent = 'Verifying Key';
    buttonArrow.style.display = 'none';
    loadingSpinner.classList.remove('hidden');
    submitButton.disabled = true;

    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        buttonText.textContent = 'Continue';
        buttonArrow.style.display = 'inline-block';
        submitButton.disabled = false;
        successOverlay.style.display = 'flex';
    }, 3000);

    setTimeout(() => {
        window.location.href = 'https://pyqs-isk.pages.dev';
    }, 10000);
});

// Security measures
document.addEventListener('keydown', e => {
    if (e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85) ||
        (e.metaKey && e.altKey && e.keyCode === 85)) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', e => {
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots are not allowed on this page.');
    }
});

document.addEventListener('keydown', e => {
    if ((e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
        e.preventDefault();
        alert('Printing is disabled on this page.');
    }
});

// Input formatting functions
function convertToUpperCaseAndRemoveNumbers(input) {
    input.value = input.value.replace(/[0-9]/g, '').toUpperCase();
}

function convertToLowerCaseAndRemoveSpaces(input) {
    input.value = input.value.replace(/\s/g, '').toLowerCase();
}

function removeSpaces(input) {
    input.value = input.value.replace(/\s/g, '');
}
