describe('Agregar Profesor', function() {
  beforeEach(function() {
       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
       jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
   });

   afterEach(function() {
     jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
   });

    it('No se permite agregar profesor porque ya existe en el sistema', function () {
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

        //agregar informacion del profesor
        var modalAddTeacher = browser.element('.modal-content');
        var teacherName = modalAddTeacher.element('input[name="nombre"]');
        var teacherLastname = modalAddTeacher.element('input[name="apellidos"]');
        teacherName.click().keys('Paula');
        teacherLastname.click().keys('Castellanos');

        modalAddTeacher.selectByValue('select[name="sexo"]','f');
        modalAddTeacher.selectByValue('select[name="idUniversidad"]','universidad-de-los-andes');
        modalAddTeacher.selectByValue('select[name="idDepartamento"]','3,ingenieria-de-sistemas');
        modalAddTeacher.element('button=Agregar profesor').click();

        browser.waitForVisible('.sweet-alert', 50000);

        var validateLoginText = browser.element('//*[@id="__next"]/div/div/div[1]/div/div/div[2]/h2').getText();
        expect(validateLoginText).toBe('El profesor que intentas agregar ya existe');

    });


});
