import java.util.*;

class q1 {
    public int[] twoSum(int[] nums, int target) {
        int[] arr = new int[2];
        HashMap<Integer, Integer> numKey = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            numKey.put(nums[i], i);
        }

        for (int key : numKey.keySet())
        {
            int secondValue = target - key;
            if (numKey.containsKey(secondValue))
            {
                if (numKey.get(secondValue) != numKey.get(key))
                {
                    arr[0] = numKey.get(key);
                    arr[1] = numKey.get(secondValue);
                    break;
                }
                else 
                    continue;
            }
        }
        return arr;

    }
}
