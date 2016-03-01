package com.tianfang.home.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tianfang.common.constants.DataStatus;
import com.tianfang.common.model.PageQuery;
import com.tianfang.common.model.PageResult;
import com.tianfang.common.model.Response;
import com.tianfang.common.util.StringUtils;
import com.tianfang.home.dto.CompRound;
import com.tianfang.train.dto.CompetitionApplyDto;
import com.tianfang.train.dto.CompetitionDto;
import com.tianfang.train.dto.CompetitionMatchDto;
import com.tianfang.train.dto.CompetitionNewsDto;
import com.tianfang.train.dto.CompetitionNoticeDto;
import com.tianfang.train.dto.CompetitionRoundDto;
import com.tianfang.train.dto.CompetitionTeamDto;
import com.tianfang.train.dto.TeamDto;
import com.tianfang.train.dto.TeamPlayerDatasDto;
import com.tianfang.train.service.ICompetitionApplyService;
import com.tianfang.train.service.ICompetitionMatchService;
import com.tianfang.train.service.ICompetitionNewsService;
import com.tianfang.train.service.ICompetitionNoticeService;
import com.tianfang.train.service.ICompetitionRoundService;
import com.tianfang.train.service.ICompetitionService;
import com.tianfang.train.service.ICompetitionTeamService;
import com.tianfang.train.service.ITeamPlayerDatasService;
import com.tianfang.train.service.ITeamService;

/**		
 * <p>Title: CompController </p>
 * <p>Description: 类描述:赛事相关操作接口</p>
 * <p>Copyright (c) 2015 </p>
 * <p>Company: 上海天坊信息科技有限公司</p>
 * @author xiang_wang	
 * @date 2016年1月26日下午5:28:26
 * @version 1.0
 * <p>修改人：</p>
 * <p>修改时间：</p>
 * <p>修改备注：</p>
 */
@Controller
@RequestMapping(value = "comp")
public class CompController extends BaseController {
	
	protected static final Log logger = LogFactory.getLog(CompController.class);

	@Autowired
	private ICompetitionService compService;
	@Autowired
	private ICompetitionNoticeService noticeService;
	@Autowired
	private ITeamService teamService;
	@Autowired
	private ICompetitionApplyService applyService;
	@Autowired
	private ICompetitionRoundService roundSerivce;
	@Autowired
	private ICompetitionMatchService matchService;
	@Autowired
	private ICompetitionTeamService cTeamService;
	@Autowired
	private ITeamPlayerDatasService playerDatasService;
	@Autowired
	private ICompetitionNewsService cnewsService;
	
	/**
	 * 赛事分页查询接口
	 * @param dto
	 * @param query
	 * @return
	 * @author xiang_wang
	 * 2016年1月26日下午5:04:33
	 */
	@RequestMapping(value = "list")
	@ResponseBody
	public Response<PageResult<CompetitionDto>> findComp(CompetitionDto dto, PageQuery query){
		Response<PageResult<CompetitionDto>> response = new Response<PageResult<CompetitionDto>>();
		try {
			PageResult<CompetitionDto> datas = compService.findCompetitionViewByPage(dto, query);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		
		return response;
	}
	
	/**
	 * 赛事详情接口
	 * @param id
	 * @return
	 * @author xiang_wang
	 * 2016年1月26日下午5:04:46
	 */
	@RequestMapping(value = "getComp")
	@ResponseBody
	public Response<CompetitionDto> getComp(String id){
		Response<CompetitionDto> response = new Response<CompetitionDto>();
		try {
			CompetitionDto comp = compService.getCompById(id);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(comp);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}

	/**
	 * 赛事公告分页
	 * @param compId
	 * @param query
	 * @return
	 * @author xiang_wang
	 * 2016年1月26日下午5:16:43
	 */
	@RequestMapping(value = "notices")
	@ResponseBody
	public Response<PageResult<CompetitionNoticeDto>> notices(String compId, PageQuery query){
		Response<PageResult<CompetitionNoticeDto>> response = new Response<PageResult<CompetitionNoticeDto>>();
		try {
			if (StringUtils.isBlank(compId)){
				response.setStatus(DataStatus.HTTP_FAILE);
				response.setMessage("赛事ID为空");
				return response;
			}
			CompetitionNoticeDto dto = new CompetitionNoticeDto();
			dto.setCompId(compId);
			PageResult<CompetitionNoticeDto> datas = noticeService.findCompNoticeViewByPage(dto, query);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 赛事公告详情
	 * @param id
	 * @return
	 * @author xiang_wang
	 * 2016年1月26日下午5:21:46
	 */
	@RequestMapping(value = "getNotice")
	@ResponseBody
	public Response<CompetitionNoticeDto> getNotice(String id){
		Response<CompetitionNoticeDto> response = new Response<CompetitionNoticeDto>();
		try {
			CompetitionNoticeDto data = noticeService.getNoticeById(id);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(data);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 赛事动态列表(分页)
	 * @param compId
	 * @param query
	 * @return
	 * @author xiang_wang
	 * 2016年2月3日上午9:51:13
	 */
	@RequestMapping(value = "news")
	@ResponseBody
	public Response<PageResult<CompetitionNewsDto>> news(String compId, PageQuery query){
		Response<PageResult<CompetitionNewsDto>> response = new Response<PageResult<CompetitionNewsDto>>();
		try {
			if (StringUtils.isBlank(compId)){
				response.setStatus(DataStatus.HTTP_FAILE);
				response.setMessage("赛事ID为空");
				return response;
			}
			CompetitionNewsDto dto = new CompetitionNewsDto();
			dto.setCompId(compId);
			PageResult<CompetitionNewsDto> datas = cnewsService.findCompetitionNewsByPage(dto, query);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 赛事动态详情
	 * @param id
	 * @return
	 * @author xiang_wang
	 * 2016年2月3日上午10:45:30
	 */
	@RequestMapping(value = "getNews")
	@ResponseBody
	public Response<CompetitionNewsDto> getNews(String id){
		Response<CompetitionNewsDto> response = new Response<CompetitionNewsDto>();
		try {
			CompetitionNewsDto data = cnewsService.getCompetitionNews(id);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(data);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 赛事下所有参赛球队
	 * @param compId
	 * @return
	 * @author xiang_wang
	 * 2016年1月28日下午4:46:15
	 */
	@RequestMapping(value = "teams")
	@ResponseBody
	public Response<List<TeamDto>> teams(String compId){
		Response<List<TeamDto>> response = new Response<List<TeamDto>>();
		try {
			List<TeamDto> teams = teamService.findAllByCompId(compId);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(teams);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 球队详情
	 * @param id
	 * @return
	 * @author xiang_wang
	 * 2016年1月28日下午4:48:48
	 */
	@RequestMapping(value = "getTeam")
	@ResponseBody
	public Response<TeamDto> getTeam(String id){
		Response<TeamDto> response = new Response<TeamDto>();
		try {
			TeamDto team = teamService.getTeamById(id);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(team);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 赛事报名接口
	 * @param dto
	 * @return
	 * @author xiang_wang
	 * 2016年2月2日上午10:00:45
	 */
	@RequestMapping(value = "apply")
	@ResponseBody
	public Response<String> apply(CompetitionApplyDto dto){
		Response<String> response = new Response<String>();
		if (StringUtils.isBlank(dto.getCompId())){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("报名失败");
			return response;
		}
		try {
			CompetitionDto comp= compService.getCompById(dto.getCompId());
			dto.setCompName(comp.getTitle());
			applyService.addCompetitionApply(dto);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setMessage("报名成功");
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("报名失败");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 查询赛事id查询所有场次下的比赛
	 * @param compId
	 * @return
	 * @author xiang_wang
	 * 2016年2月2日下午3:41:11
	 */
	@RequestMapping(value = "rounds")
	@ResponseBody
	public Response<List<CompRound>> rounds(String compId){
		Response<List<CompRound>> response = new Response<List<CompRound>>();
		if (StringUtils.isBlank(compId)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			return response;
		}
		try {
			List<CompRound> datas = findCompRounds(compId); 
			response.setData(datas);
			response.setStatus(DataStatus.HTTP_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 通过比赛日期查询当天的比赛
	 * @param compId
	 * @param date
	 * @return
	 * @author xiang_wang
	 * 2016年2月22日下午4:07:47
	 */
	@RequestMapping(value = "roundsByDate")
	@ResponseBody
	public Response<CompRound> roundsByDate(String compId, String matchDate){
		Response<CompRound> response = new Response<CompRound>();
		if (StringUtils.isBlank(compId)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			return response;
		}
		try {
			CompRound datas = findCompRounds(compId, matchDate); 
			response.setData(datas);
			response.setStatus(DataStatus.HTTP_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 根据赛事场次id查询比赛
	 * @param compId
	 * @param roundId
	 * @return
	 * @author xiang_wang
	 * 2016年2月22日下午4:14:21
	 */
	@RequestMapping(value = "roundsByRoundId")
	@ResponseBody
	public Response<CompRound> roundsByRoundId(String compId, String roundId){
		Response<CompRound> response = new Response<CompRound>();
		if (StringUtils.isBlank(compId)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			return response;
		}
		try {
			CompRound datas = getCompRoundsByCroundId(compId, roundId); 
			response.setData(datas);
			response.setStatus(DataStatus.HTTP_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 比赛详情接口
	 * @param id
	 * @return
	 * @author xiang_wang
	 * 2016年2月3日上午9:30:51
	 */
	@RequestMapping(value = "getMatch")
	@ResponseBody
	public Response<CompetitionMatchDto> getMatch(String id){
		Response<CompetitionMatchDto> response = new Response<CompetitionMatchDto>();
		if (StringUtils.isBlank(id)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			return response;
		}
		try {
			CompetitionMatchDto datas = matchService.getMatchById(id); 
			response.setData(datas);
			response.setStatus(DataStatus.HTTP_SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("查询失败");
			logger.error(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 赛事球队积分榜(分页)
	 * @param compId
	 * @param query
	 * @return
	 * @author xiang_wang
	 * 2016年2月2日下午4:07:46
	 */
	@RequestMapping(value="scoreboard")
	@ResponseBody
	public Response<PageResult<CompetitionTeamDto>> findTeams(String compId, PageQuery query){
		Response<PageResult<CompetitionTeamDto>> response = new Response<PageResult<CompetitionTeamDto>>();
		if (StringUtils.isBlank(compId)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("参数异常");
			return response;
		}
		CompetitionTeamDto dto = new CompetitionTeamDto();
		dto.setCompId(compId);
		try {
			PageResult<CompetitionTeamDto> datas = cTeamService.findCompetitionTeamByParam(dto, query);
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		
		return response;
	}
	
	/**
	 * 赛事射手榜
	 * @param compId
	 * @param query
	 * @return
	 * @author xiang_wang
	 * 2016年2月2日下午5:00:31
	 */
	@RequestMapping(value="topScorer")
	@ResponseBody
	public Response<PageResult<TeamPlayerDatasDto>> topScorer(String compId, PageQuery query){
		Response<PageResult<TeamPlayerDatasDto>> response = new Response<PageResult<TeamPlayerDatasDto>>();
		if (StringUtils.isBlank(compId)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("参数异常");
			return response;
		}
		try {
			PageResult<TeamPlayerDatasDto> datas = playerDatasService.findTeamPlayerDatasByCompId(compId, query, " num desc,red,yellow");
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		
		return response;
	}
	
	/**
	 * 赛事红黄牌
	 * @param compId
	 * @param query
	 * @return
	 * @author xiang_wang
	 * 2016年2月2日下午5:00:49
	 */
	@RequestMapping(value="cards")
	@ResponseBody
	public Response<PageResult<TeamPlayerDatasDto>> cards(String compId, PageQuery query){
		Response<PageResult<TeamPlayerDatasDto>> response = new Response<PageResult<TeamPlayerDatasDto>>();
		if (StringUtils.isBlank(compId)){
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("参数异常");
			return response;
		}
		try {
			PageResult<TeamPlayerDatasDto> datas = playerDatasService.findTeamPlayerDatasByCompId(compId, query, " red desc, yellow desc");
			response.setStatus(DataStatus.HTTP_SUCCESS);
			response.setData(datas);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(DataStatus.HTTP_FAILE);
			response.setMessage("系统异常");
			logger.error(e.getMessage());
		}
		
		return response;
	}
	
	/**
	 * 查询场次下的比赛并组装数据
	 * @param compId
	 * @return
	 * @author xiang_wang
	 * 2016年2月2日下午3:28:24
	 */
	private List<CompRound> findCompRounds(String compId) {
		List<CompRound> crs = null;
		List<CompetitionRoundDto> rounds = roundSerivce.findRoundByCompId(compId);
		if (null != rounds && rounds.size() > 0){
			List<CompetitionMatchDto> matchs = matchService.findMatchByCompId(compId);
			if (null != matchs && matchs.size() > 0){
				Map<String, List<CompetitionMatchDto>> map = new HashMap<String, List<CompetitionMatchDto>>(rounds.size());
				List<CompetitionMatchDto> temp;
				for (CompetitionMatchDto match : matchs){
					if (map.containsKey(match.getCroundId())){
						map.get(match.getCroundId()).add(match);
					} else{
						temp = new ArrayList<CompetitionMatchDto>();
						temp.add(match);
						map.put(match.getCroundId(), temp);
					}
				}
				
				crs = new ArrayList<CompRound>(rounds.size());
				for (CompetitionRoundDto round : rounds){
					CompRound cr = new CompRound();
					cr.setId(round.getId());
					cr.setName(round.getName());
					cr.setMatchs(map.get(round.getId()));
					
					crs.add(cr);
				}
			}
		}
		
		return crs;
	}
	
	/**
	 * 根据日期获得当天的比赛数据
	 * @param compId
	 * @param date
	 * @return
	 * @author xiang_wang
	 * 2016年2月22日下午4:05:24
	 */
	private CompRound findCompRounds(String compId, String matchDate) {
		CompRound result = new CompRound();
		List<CompetitionRoundDto> rounds = roundSerivce.findRoundByCompId(compId);
		if (null != rounds && rounds.size() > 0){
			CompetitionMatchDto params = new CompetitionMatchDto();
			params.setCompId(compId);
			params.setMatchDateStr(matchDate);
			List<CompetitionMatchDto> matchs = matchService.findCompetitionMatch(params);
			if (null != matchs && matchs.size() > 0){
				String croundId = matchs.get(0).getCroundId();
				result.setMatchs(matchs);
				assemblyCompRound(result, rounds, croundId);
			}
		}
		
		return result;
	}

	/**
	 * 根据赛事场次id查询比赛
	 * @param compId
	 * @param croundId
	 * @return
	 * @author xiang_wang
	 * 2016年2月22日下午4:12:50
	 */
	private CompRound getCompRoundsByCroundId(String compId, String croundId) {
		CompRound result = new CompRound();
		List<CompetitionRoundDto> rounds = roundSerivce.findRoundByCompId(compId);
		if (null != rounds && rounds.size() > 0){
			CompetitionMatchDto params = new CompetitionMatchDto();
			params.setCompId(compId);
			params.setCroundId(croundId);
			List<CompetitionMatchDto> matchs = matchService.findCompetitionMatch(params);
			if (null != matchs && matchs.size() > 0){
				result.setMatchs(matchs);
				assemblyCompRound(result, rounds, croundId);
			}
		}
		
		return result;
	}
	
	/**
	 * 组装赛事场次数据,上一轮和下一轮id
	 * @param result
	 * @param rounds
	 * @param croundId
	 * @author xiang_wang
	 * 2016年2月23日上午9:21:55
	 */
	private void assemblyCompRound(CompRound result, List<CompetitionRoundDto> rounds, String croundId) {
		for (int i = 0, len = rounds.size(); i < len; i++ ){
			if (croundId.equals(rounds.get(i).getId())){
				result.setId(croundId);
				result.setName(rounds.get(i).getName());
				if (i >= 1){
					result.setBefore(rounds.get(i-1).getId());
				}
				if (i < len - 1){
					result.setNext(rounds.get(i+1).getId());
				}
			}
		}
	}
}