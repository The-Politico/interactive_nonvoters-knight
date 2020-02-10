export function generateAlignment(stepData, voterData){
  console.log('processing: ', stepData)
  let candidates = []
  let count = [];

  let voters = [...voterData];

  if (stepData === 0){
    candidates = ['pre']
    count = [36];
  } else if (stepData === 1){
    candidates = ['A', 'B', 'C', 'D']
    count = [10, 8, 13, 5];
  } else if (stepData === 2){
    candidates = ['A', 'B', 'C', 'no-fill']
    count = [10, 8, 13, 5];
  } else if (stepData === 3){
    candidates = ['A', 'B', 'C']
    count = [10, 8, 18];
  } else {
    candidates = ['A', 'B', 'C']
    count = [10, 8, 18];
  }

  const data = [{
    "name": "candidates",
    "id": "candidates",
    "children": []
  }]

  candidates.forEach((d, i) => {
    const currentCandidate = {
      "name": d,
      "id": d,
      "children": []
    }

    // Add voters to candidates
    for (let j = 0; j < count[i]; j++) {
      currentCandidate.children.push({
        'id': voters.pop(),
        'name': 'supporter',
        'value': 1
      });
    }

    // Push candidate into overall object
    data[0].children.push(currentCandidate);
  });

  console.log('processed data: ', data )

  return data;
}
