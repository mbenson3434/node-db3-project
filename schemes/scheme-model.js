const { where } = require('../data/db-config');
const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    // addStep,
    remove
};

function find() {
    return db('schemes')
}

function findById(id) {
    const schemaObject = db('schemes').where({ id }).first()
    if (!schemaObject) {
        return Promise.resolve(null)
    } else {
        return schemaObject
    }
}

function findSteps(id) {
    //     select 
    //     st.id,
    //     sc.scheme_name,
    //     st.step_number,
    //     st.instructions
    // from schemes sc --left table
    // join steps st
    //     on sc.id = st.scheme_id
    // where sc.id = 1
    // order by step_number asc;
      const steps = db('schemes as sc')
        .join('steps as st', 'sc.id', 'st.scheme_id')
        .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        .orderBy('st.step_number', 'asc')
        .where('sc.id', id);
    if (steps.length === 0) {
        return Promise.resolve(null)
    } else {
        return steps
    }
}

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(ids => {
          return findById(ids[0]);
        });
}

function update(id, changes) {
// update schemes
// set scheme_name = "New number 5"
// where id = 9;
    return db('schemes')
        .where({ id })
        .update(changes);
}

function addStep(/* Where are we adding a step? */) {

}

function remove(id) {
    const deletedScheme = db('schemes').where("id", id).first()
    if (!deletedScheme) {
        return Promise.resolve(null)
    }
    if (deletedScheme) {
        return deletedScheme
    }
    deletedScheme.del();
    
    // return db('schemes')
    //     .where('id', id)
    //     .del();
}