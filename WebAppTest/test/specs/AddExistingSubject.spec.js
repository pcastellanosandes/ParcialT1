describe('Agregar Profesor', function() {
  beforeEach(function() {
       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
       jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
   });

   afterEach(function() {
     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
   });

    it('No se permite agregar una materia porque ya existe en el sistema', function () {
        browser.url('https://losestudiantes.co');
        browser.click('button=Cerrar');

        browser.waitForVisible('button=Ingresar', 5000);
        browser.click('button=Ingresar');

        //Hacer login
        var cajaLogIn = browser.element('.cajaLogIn');
        var mailInput = cajaLogIn.element('input[name="correo"]');
        mailInput.click();
        mailInput.keys('test21@gmail.com');

        var passwordInput = cajaLogIn.element('input[name="password"]');
        passwordInput.click();
        passwordInput.keys('test1234');
        cajaLogIn.element('button=Ingresar').click()

        //seleccionar primer profesor del listado
        browser.waitForVisible('//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/div/a',5000)
        browser.element('//*[@id="__next"]/div/div/div[2]/div/div[2]/div/div[1]/div/a').click();
        browser.waitForVisible('a=Agregar profesor',5000);
        browser.element('a=Agregar profesor').click();

        browser.waitForVisible('a=También puedes agregar una materia a la plataforma.',5000);
        browser.element('a=También puedes agregar una materia a la plataforma.').click();

        var modalAddSubject = browser.element('.modal-body');
        modalAddSubject.selectByValue('select[name="idDepartamento"]','32');

        modalAddSubject.element('input[name="nombre"]').click().keys('Test subject 1');
        modalAddSubject.element('input[name="idMateria"]').click().keys('MISO-4208');
        modalAddSubject.element('button=Agregar Nueva Materia').click();

        browser.waitForVisible('//*[@id="__next"]/div/div/div[1]/div/div/div[2]/div[2]/div',5000);
        var validateText = browser.element('//*[@id="__next"]/div/div/div[1]/div/div/div[2]/div[2]/div').getText();
        expect(validateText).toBe('No se pudo agregar esta materia, al parecer ya existe una materia con código MISO-4208');

    });


});
