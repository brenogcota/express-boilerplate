import request from 'supertest';
import app from '../src/app';

describe('Test tools routes', () => {

    let tools;
    beforeAll(() => {
        tools = {
            "title": "hotel",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }
    });

    it('should return status 200 if successful', async () => {

        const res = await request(app)
                                .get('/tools')
        
        expect(res.status).toBe(200)
    })

    it('should return an array of objects if successful', async () => {
        const expected = []
        const res = await request(app)
                                .get('/tools')
        
        expect(res.body).toEqual(
            expect.arrayContaining(expected)
        )
    })

    it('should return an array of objects searched by tag', async () => {
        const expected = []
        const res = await request(app)
                                .get('/tools?tag=node')
        
        expect(res.body).toEqual(
            expect.arrayContaining(expected)
        )
    })

    it('should return status 201 if successful', async () => {

        const newTool = {
            "title": "hotel 2",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }
        const res = await request(app)
                                .post('/tools')
                                .send(newTool)
        
        expect(res.status).toBe(201)
    })

    it('should return status 400 if tools already exists', async () => {

        const res = await request(app)
                                .post('/tools')
                                .send(tools)
        
        expect(res.status).toBe(400)
    })

    it('should return status 400 and error message if send an invalid body', async () => {

        const newTool = {
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
        }

        const res = await request(app)
                                .post('/tools')
                                .send(newTool)
        
        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({"error": "Validation fails"})
    })

    it('should return an object if successful', async () => {

        const newTool = {
            "title": "hotel 3",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }
        const res = await request(app)
                                .post('/tools')
                                .send(newTool)
        
        expect(res.body).toMatchObject({
            "id": res.body.id,
            "title": "hotel 3",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        })
    })

    it('should return an error message if tool not found', async () => {

        const res = await request(app)
                                .get('/tools/200')
        
        expect(res.body).toMatchObject({"message": "Tool not found!"})
    })

    it('should return status 200 if updated tool', async () => {

        const validId = 1;

        const updateTool = {
            "title": "updated hotel",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }

        const res = await request(app)
                                .put(`/tools/${validId}`)
                                .send(updateTool)
        
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            ...updateTool,
            id: res.body.id
        })
    })

    it('should return status 204 if remove tool', async () => {

        const validId = 1;
        const res = await request(app)
                                .delete(`/tools/${validId}`)
        
        expect(res.status).toBe(204)
    })

    
})