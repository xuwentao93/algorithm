class Solution{
  List<List<Integer>> res=new ArrayList<>();
  public List<List<Integer>> permuteUnique(int[] nums) {
      Arrays.sort(nums);
      List<Integer> temp=new ArrayList<>();
      boolean[] visited=new boolean[nums.length];
      for (int i=0;i<nums.length;i++)
          visited[i]=false;
      helper(nums,visited,temp);
      return res;

  }
  public void helper(int[] nums, boolean[] visited,List<Integer> temp)
  {
      if(temp.size()==nums.length)
      {
          res.add(new ArrayList<>(temp));
          return;
      }
      for(int i=0;i<nums.length;i++)
      {
          if(!visited[i])
          {
              visited[i]=true;
              temp.add(nums[i]);
              helper(nums,visited,temp);
              temp.remove(temp.size()-1);
              visited[i]=false;
              while(i+1<nums.length && nums[i]==nums[i+1])
                  i++;
          }

      }
  }
}
