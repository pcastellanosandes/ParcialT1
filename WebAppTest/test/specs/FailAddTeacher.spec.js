describe('Agregar Profesor', function() {
  beforeEach(function() {
       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
       jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
   });

   afterEach(function() {
     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
   });

    it('No se permite agregar profesor por no estar logueado el usuario', function () {
        browser.url('https://losestudiantes.co');
        browser.click('button=Cerrar');
        browser.element('//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/div/a').click();

        browser.waitForVisible('#universidad', 5000);

        var collageText = browser.element('#universidad').getText();
        expect(collageText).toBe('Universidad de los Andes');

        browser.click('a=Agregar profesor');

        var validateLoginText = browser.element('#contained-modal-title-lg').getText();
        expect(validateLoginText).toBe('Para agregar un profesor tienes que ingresar...');

    });


});
