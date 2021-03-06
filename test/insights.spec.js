const chai = require('chai');
const {expect} = require('chai');
const rp = require('request-promise');
const InsightsList = require('../lib/insightsList')
chai.should();

async function request(path) {
  return rp({
    url: `http://localhost:3000/insights/${path}`,
    method: 'GET',
    json: true,
  });
}

describe('InsightsList', () => {
  describe('obtaining data from external API', () => {
    var insightsList;
    before(()=>{
      insightsList = new InsightsList();
    })

    it('should have a data property on construction', () => {
      expect(insightsList.data).to.be.null;
    });

    it('should return data from the api call', async ()=>{
      const result  = await request('/categories');
      result.statusCode.should.equal(200)
    })
  });

  describe('#orderByCategory',()=>{

    const dummyData = [
      {"id":1,"amount":1798,"merchant":"Sainsburys","category":"Groceries","paymentDate":"2019-02-14T10:40:33.516Z"},

    ]
    it('will take an list of objects then return an result object', ()=>{
        var insightList = new InsightsList();
        let result = {
          "Groceries": {
            "totalNumber": 1,
            "totalValue": 1798,
            "averageValue": 1798
          }
        }
        result = JSON.stringify(result);

        console.log(`**** ${insightList.orderByCategory(dummyData)}`)
        expect(insightList.orderByCategory(dummyData)).to.equal(result)
    })
  })
});
