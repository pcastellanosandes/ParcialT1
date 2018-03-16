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

        //click en adicionar materia
        browser.waitForVisible('a=Agregar materia al profesor',5000);
        browser.element('a=Agregar materia al profesor').click();

        var modalAddSubject = browser.element('.modal-body');
        modalAddSubject.selectByValue('select[name="idDepartamento"]','ingenieria-de-sistemas');
        modalAddSubject.selectByValue('select[name="idMateria"]','MINE4202');
        
    });


});
