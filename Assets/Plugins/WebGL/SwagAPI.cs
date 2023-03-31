using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using SimpleJSON;

public class SwagAPI : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void SWAG_Init(string gameKey, string domObj, string platform);

    [DllImport("__Internal")]
    private static extern void SWAG_StartSession();

    [DllImport("__Internal")]
    private static extern void SWAG_PostScore(string board, int score);

    [DllImport("__Internal")]
    private static extern void SWAG_PostDailyScore(string date, string level_key, int score);

    [DllImport("__Internal")]
    private static extern void SWAG_ShowDialog(string type, string level_key, string title, string period, string value_formatter);

    [DllImport("__Internal")]
    private static extern void SWAG_GetCurrentEntity();

    [DllImport("__Internal")]
    private static extern void SWAG_GetUserDatastore();

    [DllImport("__Internal")]
    private static extern void SWAG_PostDatastore(string key, string value);

    [DllImport("__Internal")]
    private static extern void SWAG_StartGame();

    [DllImport("__Internal")]
    private static extern void SWAG_EndGame(string options);

    [DllImport("__Internal")]
    private static extern void SWAG_ShowAd();

    [DllImport("__Internal")]
    private static extern void SWAG_GetScoreCategories();

    [DllImport("__Internal")]
    private static extern void SWAG_GetScores(string level_key, string type, string period, int current_user, string target_date, int use_daily, string value_formatter);

    [DllImport("__Internal")]
    private static extern void SWAG_IsSubscriber();

    [DllImport("__Internal")]
    private static extern void SWAG_HasDailyScore(string level_key);

    [DllImport("__Internal")]
    private static extern void SWAG_GetCurrentDay();

    [DllImport("__Internal")]
    private static extern void SWAG_GetAchievementCategories();

    [DllImport("__Internal")]
    private static extern void SWAG_PostAchievement(string achievement);

    [DllImport("__Internal")]
    private static extern void SWAG_GetUserAchievements();

    [DllImport("__Internal")]
    private static extern void SWAG_ShowBrandingAnimation(string devElement);

    [DllImport("__Internal")]
    private static extern void SWAG_HasBrandingAnimationShown();
    
    public GameObject initBtn;
    public GameObject StartSessionBtn;

    bool inited = false;

    // Start is called before the first frame update
    void Start()
    {
        StartSessionBtn.SetActive(false);

        HasBrandingAnimationShown ();
    }

    void Update()
    {

    }

    public string APIKey = "5c6c3c056917a692f96f9651";
    public string DOMElementID = "swag";
    public string Platform = "shockwave";

    public void InitSwag()
    {
        initBtn.SetActive(false);
        SWAG_Init(this.APIKey, this.DOMElementID, this.Platform);
        inited = true;

        StartSessionBtn.SetActive(true);
    }

    public void StartSession()
    {
        if (inited)
            SWAG_StartSession();
    }

    public void StartSessionComplete()
    {
        Debug.Log("complete");
    }

    public void GetCurrentEntity()
    {
        if (inited)
            SWAG_GetCurrentEntity();
    }

    public void GetCurrentEntityComplete(string data)
    {
        Debug.Log("GetCurrentEntityComplete " + data);

        var N = JSON.Parse(data);
    }

    public void PostScore()
    {
        if (inited)
            SWAG_PostScore("level1", 10);
    }

    public void PostDailyScore()
    {
        if (inited)
            SWAG_PostDailyScore("2019-8-1", "level1", 10);
    }

    public void ShowDialog()
    {
        if (inited)
            SWAG_ShowDialog("scores", "Best Scores", "level1", "alltime", "default");
    }

    public void GetUserDatastore()
    {
        if (inited)
            SWAG_GetUserDatastore();
    }

    public void GetUserDatastoreComplete(string data)
    {
        Debug.Log("GetUserDatastoreComplete " + data);

        var N = JSON.Parse(data);
    }

    public void PostDatastore()
    {
        if (inited)
            SWAG_PostDatastore("test", "hello");
    }

    public void StartGame()
    {
        if (inited)
            SWAG_StartGame();
    }

    public void StartGameComplete()
    {
        Debug.Log("StartGameComplete");
    }

    public void EndGame()
    {
        string data = "{ \"win\": true }";
        Debug.Log("EndGame: " + data);
        if (inited)
            SWAG_EndGame(data);
    }

    public void EndGameComplete()
    {
        Debug.Log("EndGameComplete");
    }

    public void ShowAd()
    {
        if (inited)
            SWAG_ShowAd();
    }

    public void ShowAdComplete()
    {
        Debug.Log("ShowAdComplete");
    }

    public void GetScoreCategories()
    {
        if (inited)
            SWAG_GetScoreCategories();
    }

    public void GetScoreCategoriesComplete(string data)
    {
        Debug.Log("GetScoreCategoriesComplete " + data);
    }

    public void GetScores()
    {
        Debug.Log("GetScores");

        if (inited)
            SWAG_GetScores("level1", "standard", "alltime", 1, "2019-8-1", 0, "default");
    }

    public void GetScoresComplete(string data)
    {
        Debug.Log("GetScoresComplete " + data);
    }

    public void IsSubscriber()
    {
        if (inited)
            SWAG_IsSubscriber();
    }

    public void IsSubscriberComplete(string data)
    {
        Debug.Log("IsSubscriberComplete " + data);
    }

    public void HasDailyScore()
    {
        if (inited)
            SWAG_HasDailyScore("level1");
    }

    public void HasDailyScoreComplete(string data)
    {
        Debug.Log("HasDailyScoreComplete " + data);
    }

    public void GetCurrentDay()
    {
        if (inited)
            SWAG_GetCurrentDay();
    }

    public void GetCurrentDayComplete(string data)
    {
        Debug.Log("GetCurrentDayComplete " + data);
    }

    public void GetAchievementCategories()
    {
        if (inited)
            SWAG_GetAchievementCategories();
    }

    public void GetAchievementCategoriesComplete(string data)
    {
        Debug.Log("GetAchievementCategoriesComplete " + data);
    }

    public void PostAchievement()
    {
        if (inited)
            SWAG_PostAchievement("achievement1");
    }

    public void GetUserAchievements()
    {
        if (inited)
            SWAG_GetUserAchievements();
    }

    public void SWAG_GetUserAchievementsComplete(string data)
    {
        Debug.Log("SWAG_GetUserAchievementsComplete " + data);
    }

    public void ShowBrandingAnimation(string devElement)
    {
        SWAG_ShowBrandingAnimation(devElement);
    }

    public void BrandingAnimationShown()
    {
        Debug.Log("BrandingAnimationShown");
    }

    public void HasBrandingAnimationShown()
    {
        SWAG_HasBrandingAnimationShown();
    }

    public void HasBrandingAnimationShownComplete()
    {
        Debug.Log("HasBrandingAnimationShownComplete");
    }
}
