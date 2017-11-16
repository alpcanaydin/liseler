const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Tarayıcınız bu özelliği desteklememektedir.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      error => {
        let errorMessage = 'Bilinmeyen bir hata oluştu.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Bu özelliği kullanabilmek için izin vermeniz gerekmektedir.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Şu an bu özelliği kullanamıyorsunuz.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Pozisyonunuz saptanırken bir hata meydana geldi.';
            break;
          default:
            errorMessage = 'Bilinmeyen bir hata oluştu.';
        }

        reject(new Error(errorMessage));
      },
    );
  });

export default getCurrentLocation;
