const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../index"); // import server
const { review } = require("../models");

let review_id;

const movie_id = "607fea611d548316fef954fa";
const user_id = "607b2a4c6f495c4a8c0aff2f";

const body = {
  user: {
    id: "607b2a4c6f495c4a8c0aff2f",
  },
};

const token = jwt.sign(body, process.env.JWT_SECRET, {
  expiresIn: "60d",
});

const deleteAll = async () => {
  await review.deleteMany();
};

deleteAll();

//TODO //==========   R E V I E W   T E S T   ==========//
describe("Review Test", () => {
  //TODO //========== POST: review/create ==========//
  //! Test : If Movie ID not Valid
  describe("POST /review/create", () => {
    it("Error: Movie ID is not valid", async () => {
      const res = await request(app)
        .post("/review/create")
        .send({
          movie_id: "1",
          rating: 6,
          review: "Amazing movie",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Movie ID is not valid");
    });
  });
  //! Test : Rating is not Valid
  describe("POST /review/create", () => {
    it("Error: Rating is not valid", async () => {
      const res = await request(app)
        .post("/review/create")
        .send({
          movie_id: movie_id,
          rating: 6,
          review: "Amazing movie",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Rating is not valid");
    });
  });
  //! Test : If Success
  describe("POST /review/create", () => {
    it("Success", async () => {
      const res = await request(app)
        .post("/review/create")
        .send({
          movie_id: movie_id,
          rating: 4,
          review: "Amazing movie",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Success Create Review");
      review_id = res.body.data._id;
    });
  });
  //! Test : If Movie ID already Review
  describe("POST /review/create", () => {
    it("Error: Already review this movie", async () => {
      const res = await request(app)
        .post("/review/create")
        .send({
          movie_id: movie_id,
          rating: 5,
          review: "Amazing movie WOW",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("You already reviewed this movie");
    });
  });

  // describe("GET /review/movie/:movie_id", () => {
  //   it("Error: Doesn't have reviewer", async () => {
  //     const res = await request(app).get(`/review/movie/${movie_id}`);

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("This movie doesn't have reviewer yet!");
  //   });
  // });

  // describe("GET /review/user/:user_id", () => {
  //   it("Error: Not reviewing anything", async () => {
  //     const res = await request(app).get(`/review/user/${user_id}`);

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("You're not reviewing anything yet!");
  //   });
  // });

  // describe("GET /review/details/:review_id", () => {
  //   it("it should GET one review and error", async () => {
  //     const res = await request(app).get(`/review/details/1`);

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Review ID is not valid");
  //   });
  // });

  // describe("GET /review/details/:review_id", () => {
  //   it("it should GET one review", async () => {
  //     const res = await request(app).get(`/review/details/${review_id}`);

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Success");
  //   });
  // });

  // describe("GET /review/movie/:movie_id", () => {
  //   it("it should GET all review from movie", async () => {
  //     const res = await request(app).get(`/review/movie/${movie_id}`);

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Success");
  //   });
  // });

  // describe("GET /review/user/:user_id", () => {
  //   it("it should GET all review from user", async () => {
  //     const res = await request(app).get(`/review/user/${user_id}`);

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Success");
  //   });
  // });

  // describe(`PUT /review/update/:review_id`, () => {
  //   it("it should UPDATE a review and error", async () => {
  //     const res = await request(app)
  //       .put(`/review/update/${review_id}`)
  //       .send({
  //         movie_id: "1",
  //         rating: 6,
  //         review: "Really Amazing movie",
  //       })
  //       .set({
  //         Authorization: `Bearer ${token}`,
  //       });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Movie ID is not valid");
  //   });
  // });

  // describe(`PUT /review/update/:review_id`, () => {
  //   it("it should UPDATE a review and error", async () => {
  //     const res = await request(app)
  //       .put(`/review/update/${review_id}`)
  //       .send({
  //         movie_id: movie_id,
  //         rating: 6,
  //         review: "Really Amazing movie",
  //       })
  //       .set({
  //         Authorization: `Bearer ${token}`,
  //       });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Rating is not valid");
  //   });
  // });

  // describe(`PUT /review/update/:review_id`, () => {
  //   it("it should UPDATE a review", async () => {
  //     const res = await request(app)
  //       .put(`/review/update/${review_id}`)
  //       .send({
  //         movie_id: movie_id,
  //         rating: 5,
  //         review: "Really Amazing movie",
  //       })
  //       .set({
  //         Authorization: `Bearer ${token}`,
  //       });

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Success Update Review");
  //   });
  // });

  // describe("DELETE /review/delete/:review_id", () => {
  //   it("it should DELETE a review", async () => {
  //     const res = await request(app)
  //       .delete(`/review/delete/1`)
  //       .set({
  //         Authorization: `Bearer ${token}`,
  //       });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Review ID is not valid");
  //   });
  // });

  // describe("DELETE /review/delete/:review_id", () => {
  //   it("it should DELETE a review", async () => {
  //     const res = await request(app)
  //       .delete(`/review/delete/${review_id}`)
  //       .set({
  //         Authorization: `Bearer ${token}`,
  //       });

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Success delete review");
  //   });
  // });

  // describe("GET /review/details/:review_id", () => {
  //   it("it should GET one review and error", async () => {
  //     const res = await request(app).get(`/review/details/${review_id}`);

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Review not found!");
  //   });
  // });

  // describe("DELETE /review/delete/:review_id", () => {
  //   it("it should DELETE a review and error", async () => {
  //     const res = await request(app)
  //       .delete(`/review/delete/${review_id}`)
  //       .set({
  //         Authorization: `Bearer ${token}`,
  //       });

  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body.message).toEqual("Review not found");
  //   });
  // });
});
