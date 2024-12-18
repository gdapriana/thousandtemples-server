import db from "../../src/application/database.js";
import bcrypt from "bcrypt";
import supertest from "supertest";
import web from "../../src/application/web.js";

export const userTestProperties = {
  BASIC_USERNAME: "BASIC_TEST_USERNAME",
  BASIC_NAME: "BASIC_TEST_NAME",
  BASIC_PASSWORD: "BASIC_TEST_PASSWORD",
  ADMIN_USERNAME: "ADMIN_TEST_USERNAME",
  ADMIN_NAME: "ADMIN_TEST_NAME",
  ADMIN_PASSWORD: "ADMIN_TEST_PASSWORD",
  BASIC_NAME_UPDATED: "BASIC_TEST_NAME_UPDATED",
  ADMIN_NAME_UPDATED: "ADMIN_TEST_NAME_UPDATED",
}

export const createBasicUser = async () => {
  await db.user.create({
    data: {
      username: userTestProperties.BASIC_USERNAME,
      password: await bcrypt.hash(userTestProperties.BASIC_PASSWORD, 10),
      name: userTestProperties.BASIC_NAME,
    }
  })
}

export const createAdminUser = async () => {
  await db.user.create({
    data: {
      username: userTestProperties.ADMIN_USERNAME,
      password: await bcrypt.hash(userTestProperties.ADMIN_PASSWORD, 10),
      name: userTestProperties.ADMIN_NAME,
      role: "ADMIN"
    }
  })
}

export const loginBasicUser = async () => {
  const response = await supertest(web).post('/api/login')
    .send({
      username: userTestProperties.BASIC_USERNAME,
      password: userTestProperties.BASIC_PASSWORD,
    })
  return response.body.data.token;
}

export const loginAdminUser = async () => {
  const response = await supertest(web).post('/api/login')
    .send({
      username: userTestProperties.ADMIN_USERNAME,
      password: userTestProperties.ADMIN_PASSWORD,
    })
  return response.body.data.token
}

export const deleteAllUser = async () => {
  await db.user.deleteMany({
    where: { username: { contains: "TEST" }}
  })
}