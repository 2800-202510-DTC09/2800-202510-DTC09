import {todos} from '../index.mjs';

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get user.
 *     description: Get employee by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
todos.get('/todos', async (req, res) => {
   const todos = await Todo.find();
   res.json(todos);
});
