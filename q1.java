import java.util.*;

class q1 {
    public int[] twoSum(int[] nums, int target) {
        //create an array of 2
        int[] arr = new int[2];

        //creat a hashmap of key numbers
        HashMap<Integer, Integer> numKey = new HashMap<>();
        
        //add to hashmap
        for (int i = 0; i < nums.length; i++) {
            numKey.put(nums[i], i);
        }

        //go through hash map
        for (int key : numKey.keySet())
        {
            int secondValue = target - key;
            if (numKey.containsKey(secondValue))
            {
                if (numKey.get(secondValue) != numKey.get(key))
                {
                    //change the value in arrays
                    arr[0] = numKey.get(key);
                    arr[1] = numKey.get(secondValue);
                    break;
                }
                else 
                    continue;
            }
        }
        //return array
        return arr;

    }
}
