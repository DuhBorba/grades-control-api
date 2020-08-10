import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

export default router;

//Cria um grade
router.post('/', async (req, res, next) => {
  try {
    let reqGrade = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const dateTime = new Date();

    if (
      !reqGrade.student ||
      !reqGrade.subject ||
      !reqGrade.type ||
      reqGrade.value < 0 ||
      reqGrade.value == null
    ) {
      throw new Error(
        'Por favor, preencha os campos student, subject, type e value.'
      );
    }

    reqGrade = {
      id: data.nextId++,
      student: reqGrade.student,
      subject: reqGrade.subject,
      type: reqGrade.type,
      value: reqGrade.value,
      dateTime,
    };
    data.grades.push(reqGrade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.grades);

    logger.info(`POST /grades - ${JSON.stringify(reqGrade)}`);
  } catch (err) {
    next(err);
  }
});

//Atualiza um grade
router.put('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    let reqGrade = req.body;
    const dateTime = new Date();

    const index = data.grades.findIndex((grade) => grade.id === reqGrade.id);

    if (index === -1) {
      throw new Error('Grade não encontrada!');
    }
    if (
      !reqGrade.student ||
      !reqGrade.subject ||
      !reqGrade.type ||
      reqGrade.value < 0 ||
      reqGrade.value == null
    ) {
      throw new Error(
        'Por favor, preencha os campos student, subject, type e value.'
      );
    }

    reqGrade = {
      id: reqGrade.id,
      student: reqGrade.student,
      subject: reqGrade.subject,
      type: reqGrade.type,
      value: reqGrade.value,
      dateTime,
    };

    data.grades[index] = reqGrade;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.grades);

    logger.info(`PUT /grades - ${JSON.stringify(reqGrade.id)}`);
  } catch (err) {
    next(err);
  }
});

//Deleta um grade
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.grades);

    logger.info(`DELETE /grades/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//Consulta um grade
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const dataFind = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    if (dataFind == null) {
      throw new Error('Usuário não encrontrado!');
    }

    res.send(dataFind);

    logger.info(`GET /grades/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//Consulta a nota total do aluno de determinada matéria
router.get('/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter(
      (grade) =>
        grade.student === req.params.student &&
        grade.subject === req.params.subject
    );

    if (data.grades == '') {
      throw new Error('Grade não encontrada!');
    }

    const dataMaped = data.grades.map((grade) => grade.value);

    const resultReduce = dataMaped.reduce((acc, cur) => acc + cur);

    res.send(`
    A soma das notas deste aluno nesta disciplina é ${resultReduce}`);

    logger.info(
      `GET /grades/:student/:subject - ${req.params.student} /  ${req.params.subject}`
    );
  } catch (err) {
    next(err);
  }
});

//Consulta a média de determinada matéria e tipo
router.get('/average/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const reqSubject = req.params.subject;
    const reqType = req.params.type;

    data.grades = data.grades.filter(
      (grade) => grade.subject === reqSubject && grade.type === reqType
    );

    if (data.grades == '') {
      throw new Error('Grade não encontrada!');
    }

    const dataMaped = data.grades.map((grade) => grade.value);

    let increment = 1;
    const resultReduce = dataMaped.reduce((acc, cur) => {
      increment++;
      return acc + cur;
    });

    const result = resultReduce / increment;

    res.send(`
      Média: ${result.toFixed(2)}
    `);

    logger.info(
      `GET /grades/average/:subject/:type - ${req.params.subject} / ${req.params.type}`
    );
  } catch (err) {
    next(err);
  }
});

//Consulta os 3 melhores grades de determinada matéria e tipo
router.get('/top3/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const reqSubject = req.params.subject;
    const reqType = req.params.type;

    data.grades = data.grades.filter(
      (grade) => grade.subject === reqSubject && grade.type === reqType
    );

    if (data.grades == '') {
      throw new Error('Grade não encontrada!');
    }

    data.grades = data.grades.sort((a, b) => {
      return b.value - a.value;
    });

    data.grades = data.grades.splice(0, 3);

    res.send(data.grades);

    logger.info(
      `GET /grades/top3/:subject/:type - ${req.params.subject} / ${req.params.type}`
    );
  } catch (err) {
    next(err);
  }
});

//Tratamento de erros
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});
